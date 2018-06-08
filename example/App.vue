<template>
  <div id="app">
    <h1>Vue-AliPlayer</h1>
    <h2>A Vue 2.x component of <a href="https://github.com/slacrey/vue-aliplayer" target="_blank">Aliplayer</a></h2>
    <github-badge slug="slacrey/vue-aliplayer" />
    <ali-player @play="played" :source="aplayer.source" :autoplay="true" :vid="aplayer.vid" :playauth="aplayer.playauth" ref="player"></ali-player>
    <div style="margin-top:20px;">
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <button @click="replay">重播</button>
    <button @click="convert">切换</button>
    </div>
  </div>
</template>

<script>
import VueAliplayer from "../src/VueAliplayer.vue";
import GitHubBadge from "vue-github-badge";

export default {
  data() {
    return {
      aplayer: {
        source: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
        vid: "8db6e5c7ff5f4257b41e2487ec61d592",
        playauth:
          "eyJTZWN1cml0eVRva2VuIjoiQ0FJUzN3SjFxNkZ0NUIyeWZTaklxYXIzQm8zVm9lZGlqNWU1YW12OGswY3hPYmREaDdEQXRqejJJSHBLZVhkdUFlQVhzL28wbW1oWjcvWVlsck1xRnNFYkZCMlpNcHNwc2M4Sm9GUCtKcExGc3QySjZyOEpqc1ZsMDRWdmxsMnBzdlhKYXNEVkVma3VFNVhFTWlJNS8wMGU2TC8rY2lyWVhEN0JHSmFWaUpsaFE4MEtWdzJqRjFSdkQ4dFhJUTBRazYxOUszemRaOW1nTGlidWkzdnhDa1J2MkhCaWptOHR4cW1qL015UTV4MzFpMXYweStCM3dZSHRPY3FjYThCOU1ZMVdUc3Uxdm9oemFyR1Q2Q3BaK2psTStxQVU2cWxZNG1YcnM5cUhFa0ZOd0JpWFNaMjJsT2RpTndoa2ZLTTNOcmRacGZ6bjc1MUN0L2ZVaXA3OHhtUW1YNGdYY1Z5R0ZOLzducFNVUmJ2M2I0eGxMZXVrQVJtWGpJRFRiS3VTbWhnL2ZIY1dPRGxOZjljY01YSnFBWFF1TUdxQWRQTDVwZ2lhTTFyOUVQYmRnZmhtaTRBSjVsSHA3TWVNR1YrRGVMeVF5aDBFSWFVN2EwNDR4ckRoRzVnS3NNUWFnQUY2Qzl6eHF3VmdsSEFzTTJXdm11cmk1bFFRUHlYMXdndmJ4Mk91d3BRQmF0SEYrdW8wUnNURzllb2tVZmRMS0lpbkxsYlIvKys1MzlXN3BQM0k0T3h3ZjZIV2FjQTZQZVM2ZmpWQnZhd3BWSE5oNHdYR20rYk8xdUdtTXRraEhiMkExOTZUbEtYT0I4ZStEZUZ5Q1VpcVlrb21KaXdhTytGa0cxOW55SlVBUHc9PSIsIkF1dGhJbmZvIjoie1wiQ2FsbGVyXCI6XCJiY0o0ZFJHRFdRTjJnTEFvTk9nbVpwS0FMNEIxSk55YmNxaThOWkZCOERvPVxcclxcblwiLFwiRXhwaXJlVGltZVwiOlwiMjAxNy0xMC0yNVQwNjo1Mzo0N1pcIixcIk1lZGlhSWRcIjpcIjhkYjZlNWM3ZmY1ZjQyNTdiNDFlMjQ4N2VjNjFkNTkyXCIsXCJTaWduYXR1cmVcIjpcIlFHNTcwTXlrQWxzN1pxS1dTd2ppVStseTJrQT1cIn0iLCJWaWRlb01ldGEiOnsiU3RhdHVzIjoiTm9ybWFsIiwiVmlkZW9JZCI6IjhkYjZlNWM3ZmY1ZjQyNTdiNDFlMjQ4N2VjNjFkNTkyIiwiVGl0bGUiOiJXZUNoYXRfMjAxNzEwMTYxNjMzMTkiLCJDb3ZlclVSTCI6Imh0dHA6Ly92b2QubHVvYm9iYi5jb20vc25hcHNob3QvOGRiNmU1YzdmZjVmNDI1N2I0MWUyNDg3ZWM2MWQ1OTIwMDAwMS5qcGciLCJEdXJhdGlvbiI6NDIwLjB9LCJBY2Nlc3NLZXlJZCI6IlNUUy5IaUJNN2FMOEM4VVJoTU13R2Q1OG9odWtUIiwiUGxheURvbWFpbiI6InZvZC5sdW9ib2JiLmNvbSIsIkFjY2Vzc0tleVNlY3JldCI6IkRoZVdWNmJEMVBvN2pQbXJ1TFRDc25kQTFCUE5VTmpOb29iRnVEWnRqaDNlIiwiUmVnaW9uIjoiY24tc2hhbmdoYWkiLCJDdXN0b21lcklkIjoxNTY2OTk1NzgxNzM2OTg3fQ=="
      },
      player: null
    };
  },
  methods: {
    played() {
      console.log("play callback");
    },
    play() {
      const player = this.$refs.player.instance;
      player && player.play();
    },
    pause() {
      const player = this.$refs.player.instance;
      player && player.pause();
    },
    replay() {
      const player = this.$refs.player.instance;
      player && player.replay();
    },
    convert() {
      this.aplayer.source = 'http://static.smartisanos.cn/common/video/t1-ui.mp4';
      const player = this.$refs.player;
      player && player.reloadPlayer();
    }
  },
  components: {
    "ali-player": VueAliplayer,
    "github-badge": GitHubBadge
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  text-align: center;
}

a {
  color: #42b983;
  text-decoration: none;
}

.dplayer {
  width: 800px;
  margin: 50px auto;
}

h1 {
  font-size: 54px;
  color: #42b983;
  margin: 30px 0 10px;
}

h2 {
  font-size: 22px;
  color: #555;
}

@media (max-width: 768px) {
  .dplayer {
    width: 90%;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 16px;
  }
}
</style>
