const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieId: '',
    titleImg: '',
    name: '',
    name1: '',
    name2: '',
    time: '',
    tags:'',
    derec: '',
    cast: '',
    summary: '',
    ctArr: [],
    phArr: [],
    vArr: [],
    apArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
        movieId: id
    })
    console.log(this.data.movieId)
    this.getDetail()
  },
  //获取电影详情
  getDetail(){
    let _this = this
    wx.request({
        url: app.globalData.basicApi + '/v2/movie/subject/' + this.data.movieId,
        method:'GET',
        data: {
            start: 0,
            count: 20
        },
        header: {
            'Content-Type': "application/xml"
        },
        success:function(res){
            if(res.statusCode == 200 && res.errMsg == "request:ok"){
                console.log(res.data)
                let titleImg = res.data.images.large,
                    name = res.data.title,
                    time = res.data.durations[0],
                    tags = res.data.genres.join(" "),
                    derec = res.data.directors[0].name,
                    castArr = [],
                    cast = '',
                    name1 = '',
                    name2 = '',
                    summary = res.data.summary,
                    phArr = res.data.photos,
                    ctArr = res.data.casts,
                    vArr = res.data.bloopers,
                    apArr = res.data.popular_reviews;
                for(var i = 0; i < res.data.casts.length; i++ ){
                    castArr.push(res.data.casts[i].name)
                    cast = castArr.join(' ')
                }
                if (cast.indexOf('·') > -1){
                    cast = cast.split(' ')[0]
                }
                if (name.length > 12){
                    name1 = name.substring(0, 12)
                    name2 = name.substring(12)
                }
                _this.setData({
                    titleImg: titleImg,
                    name: name,
                    time: time,
                    tags: tags,
                    derec: derec,
                    cast: cast,
                    summary: summary,
                    name1: name1,
                    name2: name2,
                    ctArr: ctArr,
                    phArr: phArr,
                    vArr: vArr,
                    apArr: apArr
                })
            }
            
        }
    })    
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