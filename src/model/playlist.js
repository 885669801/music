
export class PlayList {
    constructor({id, name, coverImgUrl, userId, nickname, trackCount, playCount}) {
      this.id = id; //歌单ID
      this.name = name; //歌单名称
      this.coverImgUrl = coverImgUrl; //歌单封面
      this.userId = userId; //歌单创建者ID
      this.nickname = nickname; //歌单创建者昵称
      this.trackCount = trackCount; //歌曲数量
      this.playCount = playCount //播放数
    }
  }
export const createPlayList = function (playlist) {
    return new PlayList({
      id: playlist.id,
      name: playlist.name,
      coverImgUrl: playlist.coverImgUrl,
      userId: playlist.creator.userId,
      nickname: playlist.creator.nickname,
      trackCount: playlist.trackCount,
      playCount: playlist.playCount
    })
  };
const formatPlayList=function(list){
    let playList=[];
    list.forEach(item=>{
        if(item.id){
            playList.push(createPlayList(item))
        }
    });
    return playList
}
export default formatPlayList



function filterSinger(singers) {
  let arr = []
  singers.forEach(item => {
      arr.push(item.name)
  })
  return arr.join('/')
}
export class Song {
  constructor({ id, name, singer, album, image, duration }) {
      this.id = id //歌曲ID
      this.name = name //歌曲名称
      this.singer = singer //歌手
      this.album = album //专辑
      this.image = image //封面图
      this.duration = duration //时长
      // this.url = url //URL地址
  }
}
export function createSongs(music) {
  return new Song({
      id: music.id,
      name: music.name,
      singer: music.artists.length > 0 && filterSinger(music.artists),
      album: music.album.name,
      image: music.album.picUrl || null,
      duration: music.duration / 1000
      // url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  })
}
export function createTopList(music) {
  return new Song({
      id: music.id,
      name: music.name,
      singer: music.ar.length > 0 && filterSinger(music.ar),
      album: music.al.name,
      image: music.al.picUrl,
      duration: music.dt / 1000
  })
}
const formatSongs = function(list) {
  let Songs = []
  list.forEach(item => {
      if (item.id) {
          Songs.push(createTopList(item))
      }
  })
  return Songs
}
export class PlayListDetail {
  constructor({id, name, coverImgUrl, userId, avatarUrl, nickname, createTime, trackCount, playCount, shareCount, commentCount, tracks}) {
    this.id = id; //歌单ID
    this.name = name; //歌单名称
    this.coverImgUrl = coverImgUrl; //歌单封面
    this.userId = userId; //歌单创建者ID
    this.avatarUrl = avatarUrl; //歌单创建者头像
    this.nickname = nickname; //歌单创建者昵称
    this.createTime = createTime; //歌单创建时间
    this.trackCount = trackCount; //歌曲数量
    this.playCount = playCount; //播放数
    this.shareCount = shareCount; //分享数
    this.commentCount = commentCount; //评论数
    this.tracks = tracks //歌曲列表
  }
}

export const createPlayListDetail = function (playlist) {
  const tracks = formatSongs(playlist.tracks);
  return new PlayListDetail({
    id: playlist.id,
    name: playlist.name,
    coverImgUrl: playlist.coverImgUrl,
    userId: playlist.creator.userId,
    avatarUrl: playlist.creator.avatarUrl,
    nickname: playlist.creator.nickname,
    createTime: playlist.createTime,
    trackCount: playlist.trackCount,
    playCount: playlist.playCount,
    shareCount: playlist.shareCount,
    commentCount: playlist.commentCount,
    tracks
  })
};