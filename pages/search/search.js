Page({

  /**
   * 页面的初始数据
   */
  data: {
      items: [
          { name: 'names', value: '按人名搜索', checked: 'true'},
          { name: 'tags', value: '按类型搜索'},
      ],
      keyWay: 'names',
      keyWords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
      this.setData({
          keyWay: e.detail.value
      })
  },
    getValue(e){
        console.log(e.detail.value)
        this.setData({
            keyWords: e.detail.value
        })
    },
    toD(){
        if (this.data.keyWords!= ''){
            wx.navigateTo({
                url: '../searchD/searchD?keyWay=' + this.data.keyWay + '&keyWords=' + this.data.keyWords,
            })
        }else {
            wx.showToast({
                title: '搜索内容不能为空',
                icon: 'none',
                duration: 2500
            })
        }
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})