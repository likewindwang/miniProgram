const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: [],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      homeList: [],
      contentTitle: '',
      region: ['', '北京'],
      searchText: '',
      nowMovie: {
          start: 0,
          count: 20,
          city:'北京'
      },
      hideBox: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getHotData()
  },
  // 请求接口，拿到电影数据
  getHotData(){
      let _this = this
      wx.request({
          url: app.globalData.basicApi + '/v2/movie/in_theaters',
        //   url: app.globalData.basicApi + '/v2/movie/search?q=张艺谋',
        //   url: app.globalData.basicApi + '/v2/movie/search?tag=喜剧',
        //   url: app.globalData.basicApi + '/v2/movie/coming_soon',
        //   url: app.globalData.basicApi + '/v2/movie/weekly',
        //   url: app.globalData.basicApi + '/v2/movie/top250',
          method: 'GET',
          header: {
              'Content-Type': "application/xml"
          },
          data: _this.data.nowMovie,
          success: function (res) {
              console.log(res)
              
                _this.setData({
                    contentTitle: res.data.title
                })
                let homeListItem = {
                        img: '',
                        name: '',
                        rate: '',
                        directors: '',
                        casts: '',
                        location: '',
                        id: ''
                    },
                    directorArr = [],
                    castArr = [],
                    locationArr = [],
                    imgArr = [];
              if(res.statusCode == 200 && res.errMsg == "request:ok"){
                  for (var i = 0; i < res.data.subjects.length; i++){
                      
                      directorArr = []
                      locationArr = []
                      castArr = []
                    //   imgArr = []
                      imgArr.push(res.data.subjects[i].images.medium)
                      
                      for (var j = 0; j < res.data.subjects[i].directors.length; j++) {
                          directorArr.push(res.data.subjects[i].directors[j].name)
                          if (res.data.subjects[i].directors[0].name.indexOf('·') > -1) {
                              homeListItem.directors = directorArr[0]
                          } else {
                              homeListItem.directors = directorArr.join(' ')
                          }
                      }
                      for (var j = 0; j < res.data.subjects[i].casts.length; j++) {
                          castArr.push(res.data.subjects[i].casts[j].name)
                          if (res.data.subjects[i].directors[0].name.indexOf('·') > -1) {
                              homeListItem.casts = castArr[0]
                          }else{
                              homeListItem.casts = castArr.join(' ')
                          }
                      }
                      locationArr.push(res.data.subjects[i].pubdates[0])
                      homeListItem.location = locationArr.join(' ')
                      homeListItem.img = res.data.subjects[i].images.small
                      homeListItem.name = res.data.subjects[i].title
                      homeListItem.rate = res.data.subjects[i].rating.average
                      homeListItem.id = res.data.subjects[i].id
                      _this.data.homeList.push(homeListItem)
                      _this.setData({
                          homeList: _this.data.homeList,
                          hideBox: false
                      })
                  }
                  var newImgArrOne = {
                        0: '',
                        1: '',
                        2: '',
                        3: ''
                      },
                      newImgArrTwo = {
                          0: '',
                          1: '',
                          2: '',
                          3: ''
                      },
                      newImgArrThree = {
                          0: '',
                          1: '',
                          2: '',
                          3: ''
                      };
                  for (var i = 0; i < 4; i++ ){
                      newImgArrOne[i] = imgArr.slice(0, 4)[i]
                      newImgArrTwo[i] = imgArr.slice(4, 8)[i]
                      newImgArrThree[i] = imgArr.slice(8, 12)[i]
                  }
                  console.log(newImgArrOne)
                //   newImgArrOne = imgArr.slice(0,4)
                //   newImgArrTwo = imgArr.slice(4, 8)
                //   newImgArrThree = imgArr.slice(8, 12)
                //   var imgUrls = {
                //     one: newImgArrOne, 
                //     two: newImgArrTwo, 
                //     three:newImgArrThree
                //   }
                //   console.log(imgUrls)
                //   _this.setData({
                //       imgUrls: _this.data.imgUrls
                //   })
              }
              if(res.data.subjects.length == 0){
                  _this.setData({
                      hideBox: true
                  })
              }
          }
      })
  },
  toDetail(e){
      console.log(e.currentTarget.dataset.id)
  },
  bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      var a = e.detail.value
      this.setData({
          region: ['', a[1].replace('市', '')]
      })
      this.data.nowMovie.city = this.data.region[1]
      this.setData({
          nowMovie: this.data.nowMovie
      })
      this.getHotData()
  },
//获得搜索框文本
  searchText(e){
    console.log(e.detail.value)
    this.setData({
        searchText: e.detail.value
    })
  },
  onSearch(){
      let _this = this
      wx.request({
          //   url: app.globalData.basicApi + '/v2/movie/in_theaters',
        //   url: app.globalData.basicApi + '/v2/movie/search?q=张艺谋',
          //   url: app.globalData.basicApi + '/v2/movie/search?tag=喜剧',
          //   url: app.globalData.basicApi + '/v2/movie/coming_soon',
          //   url: app.globalData.basicApi + '/v2/movie/weekly',
          //   url: app.globalData.basicApi + '/v2/movie/top250',
          url: app.globalData.basicApi + '/v2/movie/subject/26985127/comments',
          method: 'GET',
          header: {
              'Content-Type': "application/xml"
          },
        //   data: {
        //       city: _this.data.region[1],
        //       start: 0,
        //       count: 20
        //   },
        //   data: _this.data.loclaChoose,
          success: function (res) {
              console.log(res)
            //   _this.setData({
            //       contentTitle: res.data.title
            //   })
            //   let homeListItem = {
            //       img: '',
            //       name: '',
            //       rate: '',
            //       directors: '',
            //       casts: '',
            //       location: '',
            //       id: ''
            //   },
            //       directorArr = [],
            //       castArr = [],
            //       locationArr = [];
            //   if (res.statusCode == 200 && res.errMsg == "request:ok") {
            //       for (var i = 0; i < res.data.subjects.length; i++) {
            //           directorArr = []
            //           locationArr = []
            //           castArr = []
            //           for (var j = 0; j < res.data.subjects[i].directors.length; j++) {
            //               directorArr.push(res.data.subjects[i].directors[j].name)
            //             //   if (res.data.subjects[i].directors[0].name.indexOf('·') > -1) {
            //             //       homeListItem.directors = directorArr[0]
            //             //   } else {
            //             //       homeListItem.directors = directorArr.join(' ')
            //             //   }
            //               homeListItem.directors = directorArr.join(' ')
            //           }
            //           for (var j = 0; j < res.data.subjects[i].casts.length; j++) {
            //               castArr.push(res.data.subjects[i].casts[j].name)
            //             //   if (res.data.subjects[i].directors[0].name.indexOf('·') > -1) {
            //             //       homeListItem.casts = castArr[0]
            //             //   } else {
            //             //       homeListItem.casts = castArr.join(' ')
            //             //   }
            //               homeListItem.casts = castArr.join(' ')
            //           }
            //           locationArr.push(res.data.subjects[i].pubdates[0])
            //           homeListItem.location = locationArr.join(' ')
            //           homeListItem.img = res.data.subjects[i].images.small
            //           homeListItem.name = res.data.subjects[i].title
            //           homeListItem.rate = res.data.subjects[i].rating.average
            //           homeListItem.id = res.data.subjects[i].id
            //           _this.data.homeList.push(homeListItem)
            //           _this.setData({
            //               homeList: _this.data.homeList
            //           })
            //       }
            //   }
          }
      })
  },
  getMore(){
    this.data.nowMovie.start += this.data.nowMovie.count
    this.data.nowMovie.count = 20
      this.data.nowMovie.city = this.data.nowMovie.city
    this.setData({
        nowMovie: this.data.nowMovie
    })
    this.data.nowMovie = {
        start: this.data.nowMovie.start,
        count: 20,
        city: this.data.nowMovie.city
    }
    console.log(this.data.nowMovie)
    this.getHotData()
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
    // if(this.data.searchText == ''){
    //     this.data.nowMovie.start += this.data.nowMovie.count
    //     this.data.nowMovie.count += 20
    //     this.setData({
    //         nowMovie: this.data.nowMovie
    //     })
    //     this.data.nowMovie = {
    //         'start': this.data.nowMovie.start,
    //         'count': this.data.nowMovie.count
    //     }
    //     console.log(this.data.nowMovie)
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})