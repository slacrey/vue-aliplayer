<template>
  <div class="prism-player" :id="playerId" :style="playStyle"></div>
</template>

<script>
  export default {
    name: "Aliplayer",
    props: {
      source: {
        type: String,
        default: ""
      },
      //媒体转码服务的媒体Id。
      vid: {
        type: String,
        default: ""
      },
      //播放权证
      playauth: {
        type: String,
        default: ""
      },
      //容器的大小
      height: {
        type: String,
        default: "320px"
      },
      //容器的大小
      width: {
        type: String,
        default: "100%"
      },
      //视频的高度大小
      videoWidth: {
        type: String,
        default: "100%"
      },
      //视频的宽度大小
      videoHeight: {
        type: String,
        default: "320px"
      },
      //播放器自动加载，目前仅h5可用
      preload: {
        type: Boolean,
        default: false
      },
      //播放器默认封面图片，请填写正确的图片url地址。需要autoplay为’false’时，才生效
      cover: {
        type: String,
        default: ""
      },
      //播放内容是否为直播，直播时会禁止用户拖动进度条。
      isLive: {
        type: Boolean,
        default: false
      },
      //播放器是否自动播放，在移动端autoplay属性会失效。
      autoplay: {
        type: Boolean,
        default: false
      },
      //播放器自动循环播放。
      rePlay: {
        type: Boolean,
        default: false
      },
      //指定使用H5播放器。
      useH5Prism: {
        type: Boolean,
        default: false
      },
      //指定使用Flash播放器。
      useFlashPrism: {
        type: Boolean,
        default: false
      },
      //H5是否内置播放，有的Android浏览器不起作用。
      playsinline: {
        type: Boolean,
        default: false
      },
      //显示播放时缓冲图标，默认true。
      showBuffer: {
        type: Boolean,
        default: true
      },
      //URL 皮肤图片，不建议随意修改该字段，如要修改，请参照皮肤定制。
      skinRes: {
        type: String,
        default: ""
      },

      skinLayout: {
        type: Array,
        default: function () {
          return []
        }
      },
      //默认为‘hover’。可选的值为：‘click’、‘hover’、‘always’。
      controlBarVisibility: {
        type: String,
        default: "hover"
      },
      //控制栏自动隐藏时间（ms）
      showBarTime: {
        type: String,
        default: ""
      },
      /***
       * JSON串用于定制性接口参数，目前支持：
       1.“fullTitle”：“测试页面”
       全屏时显示视频标题（仅flash支持）。
       2. “m3u8BufferLength”：“30”
       播放m3u8时加载缓存ts文件长度单位（秒）（仅flash支持）。
       3. “liveStartTime”：“2016/08/17 12:00:00”
       直播开始时间，用于提示直播未开始(仅flash支持)。
       4. “liveOverTime”：“2016/08/17 14:00:00”
       直播结束时间，用于提示直播结束（仅flash支持）。
       */
      extraInfo: {
        type: String,
        default: ""
      },

      /**
       *是否允许系统右键菜单显示，默认为false。
       */
      enableSystemMenu: {
        type: Boolean,
        default: false
      },

      /***
       *
       *指定播放地址格式，只有使用vid的播放方式时支持
       可选值为’mp4’、’m3u8’、’flv’、’mp3’，默认为空，仅H5支持。
       * */
      format: {
        type: String,
        default: "mp4"
      },
      /***
       *
       * 指定返回音频还是视频，只有使用vid的播放方式时支持。
       可选值为’video’和’audio’，默认为’video’
       ‘audio’主要是针对只包含音频的视频格式，比如音频的mp4，仅H5支持。
       * */
      mediaType: {
        type: String,
        default: "video"
      },
      /***
       * 指定排序方式，只有使用vid + plauth播放方式时支持。
       ‘desc’表示按倒序排序（即：从大到小排序）
       ‘asc’表示按正序排序（即：从小到大排序）
       默认值：‘asc’，仅H5支持。
       * */
      qualitySort: {
        type: String,
        default: "asc"
      },
      /***
       * 显示视频清晰度，多个用逗号分隔，比如：’FD,LD’，此值是vid对应流清晰度的一个子集，
       取值范围：FD（流畅）LD（标清）SD（高清）HD（超清）OD（原画）2K（2K）4K（4K），仅H5支持。
       * */
      definition: {
        type: String,
        default: ""
      },
      /**
       * 默认视频清晰度，此值是vid对应流的一个清晰度，
       取值范围：FD（流畅）LD（标清）SD（高清）HD（超清）OD（原画）2K（2K）4K（4K），仅H5支持。
       * */
      defaultDefinition: {
        type: String,
        default: ""
      },
      /**
       * 声明启用同层H5播放器，启用时设置的值为‘h5’
       * */
      x5_type: {
        type: String,
        default: "h5"
      },
      /**
       * 声明视频播放时是否进入到TBS的全屏模式，默认为false。
       当需要把视频做为背景时，设置为true
       * */
      x5_fullscreen: {
        type: Boolean,
        default: false
      },
      /**
       * 声明视频播在界面上的位置，默认为“center”。
       可选值为：“top”，“center”
       * */
      x5_video_position: {
        type: String,
        default: "center"
      },
      /**
       * 声明 TBS 播放器支持的方向，可选值：
       landscape:横屏）
       portraint:竖屏
       landscape
       * */
      x5_orientation: {
        type: String,
        default: "portraint"
      },
      /**
       * 声明TBS全屏播放是否横屏，默认值为true。
       * */
      x5LandscapeAsFullScreen: {
        type: String,
        default: "true"
      },
      /**
       * 延迟播放时间，单位为秒。
       * */
      autoPlayDelay: {
        type: Number,
        default: 0
      },
      /**
       * 延迟播放提示文本
       * */
      autoPlayDelayDisplayText: {
        type: String,
        default: "正在转码，请稍后......"
      },
      /**
       * 国际化，默认为‘zh-cn’。
       如果未设置，则采用浏览器语言。
       可选值为‘zh-cn’、‘en-us’或其它值。
       * */
      language: {
        type: String,
        default: "zh-cn"
      },
      /**
       * 自定义国际化文本json结构，key的值需要和language属性值对应起来。
       例子：{jp:{Play:”Play”}}
       * */
      languageTexts: {
        type: Object,
        default: function () {
          return {}
        }
      },
      /**
       * flash启用截图功能
       * */
      snapshot: {
        type: Boolean,
        default: false
      },
      /**
       * H5设置截图水印。
       * */
      snapshotWatermark: {
        type: Object,
        default: function () {
          return {}
        }
      },
      /**
       * Safari浏览器可以启用Hls插件播放，Safari 11除外。
       * */
      useHlsPluginForSafari: {
        type: Boolean,
        default: false
      },
      /**
       * H5播放flv时，设置是否启用播放缓存，只在直播下起作用。
       * */
      enableStashBufferForFlv: {
        type: Boolean,
        default: false
      },
      /**
       * H5播放flv时，初始缓存大小，只在直播下起作用。
       * */
      stashInitialSizeForFlv: {
        type: Number,
        default: 10
      },
      /**
       * 缓冲多长时间后，提示用户切换低清晰度，默认：20秒。
       * */
      loadDataTimeout: {
        type: Number,
        default: 20
      },
      /**
       *最大缓冲超时时间，超过这个时间会有错误提示，默认：60秒。
       * */
      waitingTimeout: {
        type: Number,
        default: 60
      },
      /**
       * 直播开始时间，直播时移功能使用，格式为：“2018/01/04 12:00:00”。
       * */
      liveStartTime: {
        type: String,
        default: ""
      },
      /**
       * 直播结束时间，直播时移功能使用，格式为：“2018/01/04 12:00:00”。
       * */
      liveOverTime: {
        type: String,
        default: ""
      },
      /**
       * 直播可用时移查询地址，详情参见直播时移。
       * https://help.aliyun.com/document_detail/65129.html?spm=a2c4g.11186623.2.28.3603bf80LR74sS
       * */
      liveTimeShiftUrl: {
        type: String,
        default: ""
      },
      /**
       * flv直播和hls时移切换是，重新创建播放器方法，详情参见直播时移。
       * https://help.aliyun.com/document_detail/65129.html?spm=a2c4g.11186623.2.28.3603bf80LR74sS
       * */
      recreatePlayer: {
        type: Function,
        default: function () {
        }
      },
      /**
       *是否显示检测按钮，默认为true。
       * */
      diagnosisButtonVisible: {
        type: Boolean,
        default: true
      },
      /**
       * 禁用进度条的Seek，默认为false，仅Flash支持。
       * */
      disableSeek: {
        type: Boolean,
        default: false
      },
      /**
       * 加密类型，播放点播私有加密视频时，设置值为1，默认值为0。
       * */
      encryptType: {
        type: Number,
        default: 0
      },
      /**
       * 进度条打点内容数组，详情参见进度条打点。
       * [
       {offset:0,text:'阿里视频云端到云到端服务的重要一环'},
       {offset:10,text:'除了支持点播和直播的基础播放功能外'},
       {offset:20,text:'深度融合视频云业务'},
       {offset:30,text:'为用户提供简单、快速、安全、稳定的视频播放服务'},
       {offset:40,text:'安装播放器Demo进行体验'},
       {offset:50,text:'开发人员请点击SDK下载'}
       ]
       * https://yq.aliyun.com/articles/686043?spm=a2c4g.11186623.2.31.3603bf80LR74sS
       * */
      progressMarkers: {
        type: Array,
        default: function () {
          return []
        }
      },
      /**
       * 点播失败重试次数，默认3次
       * */
      vodRetry: {
        type: Number,
        default: 3
      },
      /**
       * 直播播放失败重试次数，默认5次
       * */
      liveRetry: {
        type: Number,
        default: 5
      },

      playStyle: {
        type: String,
        default: ""
      },
      aliplayerSdkPath: {
        // Aliplayer 代码的路径
        type: String,
        default: "//g.alicdn.com/de/prismplayer/2.9.0/aliplayer-min.js"
      },


    },
    data() {
      return {
        playerId: "aliplayer_" + Math.random().toString(36).substr(2),
        scriptTagStatus: 0,
        isReload: false,
        instance: null
      };
    },
    created() {
      if (window.Aliplayer !== undefined) {
        // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
        this.scriptTagStatus = 2;
        this.initAliplayer();
      } else {
        // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
        this.insertScriptTag();
      }
    },
    mounted() {
      if (window.Aliplayer !== undefined) {
        // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
        this.scriptTagStatus = 2;
        this.initAliplayer();
      } else {
        // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
        this.insertScriptTag();
      }
    },
    methods: {
      insertScriptTag() {
        const _this = this;
        let playerScriptTag = document.getElementById("playerScriptTag");
        // 如果这个tag不存在，则生成相关代码tag以加载代码
        if (playerScriptTag === null) {
          playerScriptTag = document.createElement("script");
          playerScriptTag.type = "text/javascript";
          playerScriptTag.src = this.aliplayerSdkPath;
          playerScriptTag.id = "playerScriptTag";
          let s = document.getElementsByTagName("head")[0];
          s.appendChild(playerScriptTag);
        }
        if (playerScriptTag.loaded) {
          _this.scriptTagStatus++;
        } else {
          playerScriptTag.addEventListener("load", () => {
            _this.scriptTagStatus++;
            playerScriptTag.loaded = true;
            _this.initAliplayer();
          });
        }
        _this.initAliplayer();
      },
      initAliplayer() {
        const _this = this;
        // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
        if (
          _this.scriptTagStatus === 2 &&
          (_this.instance === null || _this.reloadPlayer)
        ) {
          _this.instance && _this.instance.dispose();

          document.querySelector("#" + _this.playerId).innerHTML = "";

          // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
          // 所以，我们只能在 nextTick 里面初始化 Aliplayer
          _this.$nextTick(() => {
            _this.instance = window.Aliplayer({
              id: _this.playerId,
              source: _this.source,
              vid: _this.vid,
              playauth: _this.playauth,
              width: _this.width,
              height: _this.height,
              videoWidth: _this.videoWidth,
              videoHeight: _this.videoHeight,
              preload: _this.preload,
              cover: _this.cover,
              isLive: _this.isLive,
              autoplay: _this.autoplay,
              rePlay: _this.rePlay,
              useH5Prism: _this.useH5Prism,
              useFlashPrism: _this.useFlashPrism,
              playsinline: _this.playsinline,
              showBuffer: _this.showBuffer,
              skinRes: _this.skinRes,
              skinLayout: _this.skinLayout,
              controlBarVisibility: _this.controlBarVisibility,
              showBarTime: _this.showBarTime,
              extraInfo: _this.extraInfo,
              enableSystemMenu: _this.enableSystemMenu,
              format: _this.format,
              mediaType: _this.mediaType,
              qualitySort: _this.qualitySort,
              definition: _this.definition,
              defaultDefinition: _this.defaultDefinition,
              x5_type: _this.x5_type,
              x5_fullscreen: _this.x5_fullscreen,
              x5_video_position: _this.x5_video_position,
              x5_orientation: _this.x5_orientation,
              x5LandscapeAsFullScreen: _this.x5LandscapeAsFullScreen,
              autoPlayDelay: _this.autoPlayDelay,
              autoPlayDelayDisplayText: _this.autoPlayDelayDisplayText,
              language: _this.language,
              languageTexts: _this.languageTexts,
              snapshot: _this.snapshot,
              snapshotWatermark: _this.snapshotWatermark,
              useHlsPluginForSafari: _this.useHlsPluginForSafari,
              enableStashBufferForFlv: _this.enableStashBufferForFlv,
              stashInitialSizeForFlv: _this.stashInitialSizeForFlv,
              loadDataTimeout: _this.loadDataTimeout,
              waitingTimeout: _this.waitingTimeout,
              liveStartTime: _this.liveStartTime,
              liveTimeShiftUrl: _this.liveTimeShiftUrl,
              liveShiftSource: _this.liveShiftSource,
              recreatePlayer: _this.recreatePlayer,
              diagnosisButtonVisible: _this.diagnosisButtonVisible,
              disableSeek: _this.disableSeek,
              encryptType: _this.encryptType,
              progressMarkers: _this.progressMarkers,
              vodRetry: _this.vodRetry,
              liveRetry: _this.liveRetry,
            });

            // 绑定事件，当 AliPlayer 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
            _this.instance.on("ready", () => {
              this.$emit("ready", _this.instance);
            });

            _this.instance.on("play", () => {
              this.$emit("play", _this.instance);
            });

            _this.instance.on("pause", () => {
              this.$emit("pause", _this.instance);
            });

            _this.instance.on("ended", () => {
              this.$emit("ended", _this.instance);
            });

            _this.instance.on("livestreamstop", () => {
              this.$emit("livestreamstop", _this.instance);
            });

            _this.instance.on("m3u8retry", () => {
              this.$emit("m3u8retry", _this.instance);
            });

            _this.instance.on("hidebar", () => {
              this.$emit("hidebar", _this.instance);
            });

            _this.instance.on("waiting", () => {
              this.$emit("waiting", _this.instance);
            });

            _this.instance.on("snapshoted", () => {
              this.$emit("snapshoted", _this.instance);
            });

            _this.instance.on("timeupdate", () => {
              this.$emit("timeupdate", _this.instance);
            });

            _this.instance.on("requestfullscreen", () => {
              this.$emit("requestfullscreen", _this.instance);
            });

            _this.instance.on("cancelfullscreen", () => {
              this.$emit("cancelfullscreen", _this.instance);
            });

            _this.instance.on("error", () => {
              this.$emit("error", _this.instance);
            });

            _this.instance.on("startseek", () => {
              this.$emit("startseek", _this.instance);
            });

            _this.instance.on("completeseek", () => {
              this.$emit("completeseek", _this.instance);
            });
          });
        }
      },
      /**
       * 播放视频
       */
      play: function () {
        this.instance.play();
      },
      /**
       * 暂停视频
       */
      pause: function () {
        this.instance.pause();
      },
      /**
       * 重播视频
       */
      replay: function () {
        this.instance.replay();
      },
      /**
       * 跳转到某个时刻进行播放
       * @argument time 的单位为秒
       */
      seek: function (time) {
        this.instance.seek(time);
      },
      /**
       * 获取当前时间 单位秒
       */
      getCurrentTime: function () {
        return this.instance.getCurrentTime();
      },
      /**
       *获取视频总时长，返回的单位为秒
       * @returns 返回的单位为秒
       */
      getDuration: function () {
        return this.instance.getDuration();
      },
      /**
       获取当前的音量，返回值为0-1的实数ios和部分android会失效
       */
      getVolume: function () {
        return this.instance.getVolume();
      },
      /**
       设置音量，vol为0-1的实数，ios和部分android会失效
       */
      setVolume: function (vol) {
        this.instance.setVolume(vol);
      },
      /**
       *直接播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换暂不支持直播rtmp流切换
       *@argument url 视频地址
       *@argument time 跳转到多少秒
       */
      loadByUrl: function (url, time) {
        this.instance.loadByUrl(url, time);
      },
      /**
       * 设置播放速度
       *@argument speed 速度
       */
      setSpeed: function (speed) {
        this.instance.setSpeed(speed);
      },
      /**
       * 设置播放器大小w,h可分别为400px像素或60%百分比chrome浏览器下flash播放器分别不能小于397x297
       *@argument w 播放器宽度
       *@argument h 播放器高度
       */
      setPlayerSize: function (w, h) {
        this.instance.setPlayerSize(w, h);
      },
      /**
       *目前只支持H5播放器。
       暂不支持不同格式视频间的之间切换。
       暂不支持直播rtmp流切换。
       */
      replayByVidAndPlayAuth: function (vid, accId, accSecret, stsToken, authInfo, domainRegion) {
        this.instance.replayByVidAndPlayAuth(vid, accId, accSecret, stsToken, authInfo, domainRegion);
      },

      /***
       * 重新设置vid和权限，目前只支持H5播放器。
       暂不支持不同格式视频间的之间切换。
       暂不支持直播rtmp流切换。
       * @param vid 视频ID
       * @param playauth 播放权限
       */
      replayByVidAndAuthInfo: function (vid, playauth) {
        this.instance.replayByVidAndAuthInfo(vid, playauth);
      },

      /**
       * 目前只支持HTML5界面上的重载功能,暂不支持直播rtmp流切换m3u8）之间切换,暂不支持直播rtmp流切换
       *@argument vid 视频id
       *@argument playauth 播放凭证
       */
      reloaduserPlayInfoAndVidRequestMts: function (vid, playauth) {
        this.instance.reloaduserPlayInfoAndVidRequestMts(vid, playauth);
      },

      /***
       *设置截图参数
       * @param width 宽度
       * @param height 高度
       * @param rate 截图质量
       */
      setSanpshotProperties: function (width, height, rate) {
        this.instance.setSanpshotProperties(width, height, rate);
      },
      /**
       * 设置封面地址
       * @param cover 封面地址
       */
      setCover: function (cover) {
        this.instance.setCover(cover);
      },


      reloadPlayer: function () {
        this.isReload = true;
        this.initAliplayer();
        this.isReload = false;
      }
    }
  };
</script>

<style>
  @import url(//g.alicdn.com/de/prismplayer/2.9.0/skins/default/aliplayer-min.css);
</style>
