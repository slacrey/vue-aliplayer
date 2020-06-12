<template>
  <div id="app">
    <h1>Vue-AliPlayer</h1>
    <h2>A Vue 2.x component of <a href="https://github.com/slacrey/vue-aliplayer" target="_blank">Aliplayer</a></h2>
    <github-badge slug="slacrey/vue-aliplayer" />
    <ali-player @play="played" :autoplay="true" :source="aplayer.source"
                :vid="aplayer.vid" ref="player"></ali-player>
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
        source:"https://outin-88135041acb011ea9e4500163e1c955c.oss-cn-shanghai.aliyuncs.com/sv/11720f02-172a8f945bb/11720f02-172a8f945bb.mp4?Expires=1591976619&OSSAccessKeyId=LTAIVVfYx6D0HeL2&Signature=v305DWgiM5CoixTnrbybXd86H%2FI%3D",
        vid: "bf9b7e4a36d84aea8cee769765fbc28b",
        videoHeight:"1000px",
        videoWidth:"800px"
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
