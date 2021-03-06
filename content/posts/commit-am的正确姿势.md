---
title: commit -am的正确姿势
date: 2020-05-11 10:18:22
template: post
slug: git-commit-am
thumbnail: ../cover/wallhaven-x8wmez.jpeg
tags: 
	-	git
categories:
	-	Git
excerpt: 装杯做好打脸的准备...
pwd: 
---

> 记一次尴尬的提交...

正常命令提交的某日
“每次都要 add 再 commit，好麻烦啊，找一找有没有快捷命令..”
“还真有！`git commit -am <message>`，hhhh 舒服了”

看着同事们还在按部就班的敲着`git add . | git commit -m`，我正了正身子，带着一丝'我懂你不懂'的窃喜轻描淡写地敲出了命令
"我提了"
"OK👌"
-- A FEW MOMENTS LATER --
“你提哪了？”
“我...”
该死，不会是命令有问题吧，急忙查询了下命令与正常操作的区别

## git commit -am 与 git commit -m

`git commit -am`用于提交已跟踪的文件(tracked)，`git commit -m`用于提交暂存区的文件。

什么是已跟踪文件呢，这要从 Git 文件状态变化周期说起了

## git file status lifecycle

![lifecycle.png](https://i.loli.net/2020/05/11/WHxyFlS38t9ivcX.png)

git 内文件的状态分为**未跟踪**和**已跟踪**，一个新增的文件初始状态是**untracked(未跟踪)**，它既没有上次的记录(stage)，也不在暂存区中，在 add 该文件之后，文件就有了一次记录，针对其在做修改的话，会变成**modified(已修改)**状态。这时，使用 commit 会将已跟踪文件的变化提交暂存区。

了解了状态更替之后，再看 commit -am。
这是 git 提供的一个跳过使用暂存区域的方式(跳过 git add)，Git 会自动把所有已跟踪过的文件暂存提交。

> 命令中 a 参数的含义
> OPTIONS
> -a, --all
> Tell the command to automatically stage files that have been modified and >deleted, but new files you have not told Git about are not affected.

翻译：git 会自动把当前所有修改和删除文件放到 stage 里，但是没添加过的不受影响

看到这里，恍然大悟，随即重新 add commit 提交一次
“刚才网卡了，你再看看呢”
“哦哦，看到了”

> 无它，唯菜耳
