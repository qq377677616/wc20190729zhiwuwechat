// component/audio/index.js
const backgroundAudioManager = wx.getBackgroundAudioManager();
var app = getApp()

Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        isPause: {
            type: Boolean,
            value:false
        }
    },
    data: {
        // 这里是一些组件内部数据
        someData: {},
        isPause:false
    },

  ready: function () {
      this.controls(1)
  },
    methods: {
        controls(isSwitch){
            var _backgroundAudioManager = app.globalData.backgroundAudioManager;
            console.log(_backgroundAudioManager.paused)
            console.log(isSwitch)
            if (_backgroundAudioManager.paused) {
                if (isSwitch === 1) {
                    this.properties.isPause = true;
                    this.setData({ isPause: true })
                } else {
                    console.log(_backgroundAudioManager)
                    _backgroundAudioManager.play();
                    this.setData({ isPause: false });
                    this.properties.isPause = false
                }
            } else {
                if (isSwitch === 1) {
                    this.setData({ isPause: false });
                    this.properties.isPause = false
                } else {
                    _backgroundAudioManager.pause();
                    this.setData({ isPause: true });
                    this.properties.isPause = true
                }
            }
        },
        btnMusic() {
            console.log(backgroundAudioManager.paused);
            // backgroundAudioManager.pause()
            if (backgroundAudioManager.paused) {
                this.setData({
                    isMusic: backgroundAudioManager.paused
                });
                // console.log(this.data.isMusic)
                backgroundAudioManager.play()
            } else {
                this.setData({
                    isMusic: backgroundAudioManager.paused
                });

                backgroundAudioManager.pause()
            }
        },
        // 这里是一个自定义方法
        // customMethod: function () { }
    }
});