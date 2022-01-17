/*
 * @Date: 2022-01-17 16:09:04
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-01-17 16:13:45
 * @Description: 音乐接口
 */
import { request } from '../utils/request';

const getMusicListXHR = (params) => request.get('/music/list/fetch', { params });

const getArtistInfoXHR = (params) => request.get('/music/artist/fetch', { params });

export { getArtistInfoXHR, getMusicListXHR };
