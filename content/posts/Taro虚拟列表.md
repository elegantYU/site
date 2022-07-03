---
title: Taro虚拟列表
date: 2022-07-01 22:05:SS
template: post
thumbnail: ../cover/wallhaven-l32e32.jpeg
excerpt:
slug:
categories:
  - 总结
tags:
  - 组件
pwd:
---

## 业务背景

业务场景是 taro 小程序中一个数量不定的列表页，**列表数据全部一次给出**；**列表可筛选排序**；**列表项可切换自身选中状态**；**列表项并非统一高度**；**进入列表页需要跳转到指定元素位置**；**滚动视图高度由 css 内计算(自适应)**。

针对这种场景，如果使用原生语法 wxxs 来实现的结果会是：进入页面会基本无延迟看到滚动视图内的列表渲染，如果数据量过大，则在渲染数据到视图的时间内用户无法交互(点击，滚动)，一旦渲染完毕则可流畅使用。

如果是在 Taro 中使用 hooks 语法同样也是请求到数据后全量 setState， 那么你的用户体验会非常恐怖：首先是白屏 n 秒用于渲染数据，如果数据量过大，那么生成的列表项 item 也很多，滚动不会如原生般流畅，对列表每做一次数据更新(排序、筛选、更新单个列表项的选中状态)，list 数据都会全量更新渲染，带来极其可怕的性能负担。

由此我首先想到的便是使用虚拟列表来优化此场景，可 taro 提供的 [virtual-list](https://github.com/NervJS/taro/tree/next/packages/taro-components/virtual-list/react) 组件对于定制化的业务需求存在很多局限性(列表每项 item 高度需一致、滚动列表高度需固定等等)。又研究了下公司其他部门同事封装的 [taro3-virtual-list](https://github.com/tingyuxuan2302/taro3-virtual-list)，这个组件也是无法满足部分需求(进入列表跳转指定元素位置、只能从上向下加载等)，在尝试引入该组件时也是出现了与公司新版本框架不兼容或依赖缺失等问题。

帮别人查缺补漏不如推倒重来，思考一个晚上加半个白天终于确定一条适配性较高的实现逻辑。

## 使用

```jsx
import VirtualList from './VirtualList';
import Item from './Item';

// 列表项
const renderRowJSX = (data, i) => {
  return <Item data={data} key={i} {...extraProps} />;
};

// 列表
const TrainList = ({ list }) => {
  return (
    <VirtualList
      list={list} /* 需要渲染的列表数据 */
      listId='list-wrap' /* 可自定义的 id 用于控制 scrollView 的样式 */
      itemCounts={10} /* 需要渲染的数据量(每屏) */
      scrollIntoViewIdx={scrollToView} /* 进入页面滚动到指定元素位置的索引 */
      scrollViewProps={{
        scrollY: true,
        scrollIntoView: `train_item_${scrollToView}`,
        onScroll: () => {},
      }} /* 与 ScrollView 组件的 props 格式一致 */
      renderItem={renderRowJSX} /* 渲染的列表 Item */
    ></VirtualList>
  );
};

export default TrainList;
```

## props

`list: any[]`

渲染列表的数据(必填)

`itemCounts: number`

希望每屏(组)渲染的 item 数(必填)，需自行估算显示的列表长度，可以超出部分

`renderItem: JSX.Element`

列表项组件，提供 (data, index) 数据(必填)

`loading: number | null`

用 loading 来过渡滚动到指定位置时不断加载渲染的列表数据，scrollIntoViewIdx 为空时不会显示 loading

`listId: string | null`

自定义列表 id，若需从外部控制列表的样式可添加，默认为 “virtual-list”

`screenCounts: number`

希望可视区域上下多渲染的组(屏)数，默认是上下各多两组数据，滑动时可平滑过度

`scrollIntoViewIdx: number`

进入页面后需要跳转的指定位置元素的索引，若有值则会先渲染索引所在组极其上下数据

`scrollViewProps`

taro scrollView 组件提供的参数格式

`onComplete: function`

数据全部渲染过后执行的回调(并非列表滚动到最底部或最顶部)

可以看到由用户必须配置的参数只有 list 元数据、itemCounts item 每屏数量及 renderItem 列表项组件三个参数，其余内容皆是由组件内部计算。

## 原理

### 思路

虚拟列表原理即是只为用户渲染可视区域的数据，在数据移动到不可见区域时会使用当前可视区域的新数据进行替换。那么我们需要关注以下几点关键问题：

- 大量数据需要拆分成大于等于可视区域可容纳的数量
- 滚动后如何判断需要加载新数据，两组数据相交时如何判断处理

判断如何加载替换新旧数据，这里从 [taro3-virtual-list](https://github.com/tingyuxuan2302/taro3-virtual-list) 借鉴到计算每组数据渲染后高度，在此组数据不可见时使用记录的高度填充的思路，暂且不表。

### 数据转换

将一组数据转换根据 `itemCounts` 转换成二维数组，用于做虚拟列表每屏的分页显示及上滑下拉的数据填充，使用 itemCounts 是完全交由开发决定每组加载渲染多少数据量，而非死板的根据一个固定的视图高度和列表项高度做计算(业务背景也做了不适用固定高度的说明)。

这里的 counts 数量完全可以根据开发的经验判断，写入略微超出视图高度的数据量也无伤大雅。

如此我们得到了一个转换后的二维数组，还需要一个二维数组的索引用于控制当前的渲染项，声明 `currentIndex`。

```js
const convertList = () => {
  const listLength = Math.ceil(list.length / itemCounts);
  const _list = Array.from({ length: listLength }).map((v, i) => list.slice(i * itemCounts, (i + 1) * itemCounts));

  setAllList(_list);
  setAllHeight(Array.from({ length: listLength }));
};
```

### 计算高度

我们需要把每组数据渲染后的高度记录到 `allHeight` 数组中，以便之后不可视区域直接使用渲染后高度填充替代列表项，那么如何计算渲染后的高度呢？

小程序 api 中的 `createSelectorQuery` 可以做到这一点

```js
// 计算占位高度 传入组索引进行计算该组高度
const calcGroupHeight = (idx) => {
  const query = Taro.createSelectorQuery();
  query.select(`#${listId} .wrap_${idx}`).boundingClientRect();
  query.exec((res) => {
    if (loadedList.length != 0 && res?.[0]?.height) {
      allHeight[idx] = res?.[0]?.height;
      setAllHeight(allHeight);
    }
  });
};
```

还有个很关键的问题：怎么获取到 dom 渲染后的时机，或者说怎么判断数据渲染完毕了。

这里使用了 [Taro.nextTick(() => {})](https://github.com/NervJS/taro/blob/60b897aad8c59e3912499de68d32ed768d9ba60c/packages/taro-runtime/src/next-tick.ts#L7)，官方给出说法是: 延迟一部分操作到下一个时间片再执行。（类似于 setTimeout）。

可是查看源代码后才知道其功能远比描述的强大，nextTick 是使用 setTimeOut 方法在数据更新队列中做一个不断异步延迟的骚操作函数，是一个较底层的 api。这个特性可以在数据更新后页面不在加载数据后添加一些 callback。

### 初始化渲染

初始化渲染该怎么加载二维数组数据？绝不是仅仅加载第一组这么简单，因为我们没有利用到 `itemSize` 和 `scrollHeight` 去做精细的判断，仅凭开发传入的 `itemCounts` 可能会出现刚好占满滚动视图或短于视图，这样我们将无法进行滑动操作以加载其他数据。

并且还需要考虑“进入列表页需要跳转到指定元素位置”这个需求，那么可能出现的情况就分为三种：自顶向下、自底向上、不在顶底位置。

不妨将三种情况再抽象下，我们需要只是根据 `scrollIntoViewIdx` 判断出需要渲染的组，然后结合 `screenCounts` 多加载指定组周围几组数据，是否就可以解决上述问题？

```js
// 初始化渲染 screenCounts 组数据
const initRenderGroup = (_list) => {
  const listLength = _list.length;
  const _idx = !scrollIntoViewIdx ? 0 : Math.ceil(scrollIntoViewIdx / itemCounts); // 确定初始组 若没有初始组则冲第一个开始渲染
  const screens = screenCounts + 1; // +1 是为了比较大小

  const handledList = Array.from({ length: listLength }).map((v, i) => {
    if (!_idx && i < _idx + screens) {
      // 若从头向下渲染 渲染下 screenCounts 组数据
      return _list[i];
    } else if (i > _idx - screens && i < _idx + screens && _list[i].length) {
      // 若非从头向下渲染 渲染当前组上下 screenCounts 组数据
      return _list[i];
    }
    return v;
  });

  setCurrentIndex(_idx);
  setLoadedList(handledList);

  // 在 loadedlist 更新数据后，计算已渲染组的高度
  handledList.map((v, i) => {
    if (v?.length) {
      Taro.nextTick(() => {
        calcGroupHeight(i);
      });
    }
  });
};
```

### 加载下组数据

判断新旧数据可视区域相交、不相交，在初始化 `screenCounts` 组数据后是否变得很简单了。

并没有使用与原思路相同的 `createIntersectionObserver` 对每组数据添加监听，而是选择使用滚动时的 `{ scrollTop }` 和各组数据渲染后的高度做计算而决定应该加载哪些数据以及使用高度替代掉哪些组。

公式: 已记录高度之和 - scrollTop > 0 时，取这个 index 就是下个 `currentIndex`。

有了 index，根据初始化渲染的经验，我们直接渲染 `index ± screenCounts` 这些组数据，其他组数据根据高度依次填充替换。这样就解决了数据交替的问题

```js
const renderNextGroup = ({ scrollTop }) => {
  // 根据 scrollTop 计算应该显示的 idx
  let tempSum = 0;
  const screens = screenCounts + 1;
  const calcIdx = allHeight.findIndex((v) => {
    tempSum += v || 0;
    return tempSum > scrollTop;
  });

  const handledList = loadedList.map((v, i) => {
    if (i > calcIdx - screens && i < calcIdx + screens) {
      if (allList[i]?.length) {
        return allList[i];
      }
    }
    return { height: allHeight[i] };
  });

  setCurrentIndex(calcIdx);
  setLoadedList(handledList);

  handledList.map((v, i) => {
    if (v?.length) {
      Taro.nextTick(() => {
        calcGroupHeight(i);
      });
    }
  });
};

const onScroll = util.throttle((e) => {
  renderNextGroup(e.detail);

  scrollViewProps?.onScroll?.(e);
}, 50);

return (
  <ScrollView {...scrollViewProps} id={listId} className='virtual-list' onScroll={onScroll} ref={scrollViewEl}>
    <View className='virtual-list-main'>
      {loadedList.map((l, i) => (
        <View className={`wrap_${i}`} key={i}>
          {!l?.length ? (
            <View style={{ height: `${l?.height}px` }}></View>
          ) : (
            <>{l.map((val, idx) => renderItem(val, i * itemCounts + idx, currentIndex))}</>
          )}
        </View>
      ))}
    </View>
  </ScrollView>
);
```

## 优缺点

### 优点

用此法优化后，进入页面的渲染延迟可以缩减到原生写法全量 setState 的 1/5，正常滚动情况下也不会出现白屏加载的情况，筛选排序的这种全量更新外部 list 的场景延迟也保持在 100ms 以下。

### 缺点

#### 针对“列表项可切换自身选中状态”需求

如果是在渲染的 list 内更改数据的话，那么每次切换单项状态都会使得整个 list 全量修改，相应的虚拟列表也会重新全部计算+渲染。

我使用的方案是增加一个桥梁 list `tempList`，该数据与列表原数据一致，点击切换单项状态时只修改 tempList 而非渲染的 list，tempList 只用于最后提交时获取所有选中态 item 用，不参与渲染；同时，在 ItemJsx 里用组件内部的 state 代替 list 分发的 data，item 的 UI 选中状态用自身 state 切换并同步 localStorage 临时缓存已选中的 item，用户上下滑动时会重新渲染 Item 组件，在生命周期中加入 storage 切换状态的判断(页面卸载时清除该 storage)。

```jsx
// 列表项
const TrainItem = ({ data, udpate }) => {
  const [interData, setInterData] = useState({}); // 把列表数据转换成组件内部数据

  // 获取所有选中 item
  const getStorageList = () => cwx.getStorageSync(TRAIN_OTHERLIST) || [];
  // 判断当前 item 是否是选中的 item
  const isTrainExist = (_t) => {
    const storageList = getStorageList();
    const { trainNumber, arriveTime, departTime } = _t;
    return storageList.find(
      (v) => v.trainNumber == trainNumber && v.arriveTime == arriveTime && v.departTime == departTime,
    );
  };

  // 更新临时缓存
  const updateStorage = (oldTrain, newTrain) => {
    const storageList = getStorageList();
    const isExist = isTrainExist(interData);
    const _storageList = isExist
      ? storageList.map((v) =>
          v.trainNumber == oldTrain.trainNumber &&
          v.arriveTime == oldTrain.arriveTime &&
          v.departTime == oldTrain.departTime
            ? newTrain
            : v,
        )
      : [...storageList, newTrain];

    cwx.setStorageSync(TRAIN_OTHERLIST, _storageList);
  };

  // 点击切换选中状态
  const onClickItem = () => {
    const { active } = interData;

    if (!active) return;

    const newInterData = { ...interData, active: !active };

    // 更新外部 tempList
    udpate(interData);
    setInterData(newInterData);
    // 更新临时缓存
    updateStorage(interData, newInterData);
  };

  // 迎合虚拟列表 该组件内部的状态需要在被虚拟列表重载时，同步上次的状态
  const initTrainStatus = () => {
    const storageList = getStorageList();
    const isExist = isTrainExist(data);
    const newTrain = isExist
      ? storageList.find(
          (v) =>
            v.trainNumber == data.trainNumber && v.arriveTime == data.arriveTime && v.departTime == data.departTime,
        )
      : data;

    setInterData(newTrain);
  };

  useEffect(() => {
    initTrainStatus();
  }, [data]);

  return (
    <View className={classnames({ active: interData.active })}>
      <Button onClick={onClickItem}>点击选中</Button>
    </View>
  );
};

// 页面组件 虚拟列表的外层组件
const Page = () => {
  const [originList, setOriginList] = useState([]); // 原数据 - 除去主车次、推荐车次外的车次
  const [filterList, setFilterList] = useState([]); // 显示数据 - 筛选车次列表数据
  const [tempList, setTempList] = useState([]); // 桥梁数据 - 用来收集更新每个 item 的选中状态，避免列表不断刷新

  const updateTempList = (single) => {
    const { active, id } = single;

    const _list = tempList.map((t) => (t.id == id ? { ...t, active: !active } : t));

    setTempList(single);
  };

  const renderRowJSX = (data, i) => {
    return <Item data={data} key={i} update={updateTempList} />;
  };

  return (
    <VirtualList
      list={filterList}
      listId='list-wrap'
      itemCounts={10}
      scrollIntoViewIdx={scrollToView}
      scrollViewProps={{
        scrollY: true,
        scrollIntoView: `train_item_${scrollToView}`,
        onScroll: () => {},
      }}
      renderItem={renderRowJSX}
    ></VirtualList>
  );
};
```

如果业务中没有 item 操作需要修改 list 数据的情况，那么可以忽略这个方案

#### 用户快速滚动

毕竟还是分页加载数据也是有加载渲染时间的，若用户大力快速滑动列表，可能会出现短暂的白屏，这是高度占位组在替换成渲染组。

目前的做法是调整 onScroll 的 throttle 函数的时间参数，50ms 情况下白屏出现的时长应该是用户可以接受的状态，代价就是频繁的更新 state 可能会有些许性能负担。也在考虑是否可以使用骨架屏的方案用于处理加载白屏问题。

#### 进入页面滚动到指定元素位置

实现这个需求带来的问题就是：列表在滚动时会不断加载些其他组的数据，本次测试大概会有 2-3s 的数据混乱的状态(视觉体验上)，加载完毕后会停留在正确的元素位置上，现在没有什么特别好的解决方法，暂时使用 loading 过渡这种混乱的场景。

若没有跳转指定元素位置的需求，此条可以忽略

```jsx
const VirtualList = ({ loading = 3000, ...rest }) => {
  useEffect(() => {
    // 如果没有初始元素 则不显示 loading
    if (scrollIntoViewIdx) {
      util.showLoading();
      setTimeout(() => {
        util.hideLoading();
      }, loading);
    }
  }, [scrollIntoViewIdx]);
};
```
