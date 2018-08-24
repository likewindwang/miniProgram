const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
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
            city: '北京'
        },
        hideBox: true,
        imgArr: [],
        imgBool: true,
        apiUrl: '',
        tpTitle: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            apiUrl: options.url,
            tpTitle: options.value
        })
        wx.showLoading({
            title: '玩命加载中...'
        })
        this.getHotData()
    },
    // 请求接口，拿到电影数据
    getHotData() {
        let _this = this
        wx.request({
            // url: app.globalData.basicApi + '/v2/movie/in_theaters',
            //   url: app.globalData.basicApi + '/v2/movie/search?q=张艺谋',
            //   url: app.globalData.basicApi + '/v2/movie/search?tag=喜剧',
            //   url: app.globalData.basicApi + '/v2/movie/coming_soon',
            //   url: app.globalData.basicApi + '/v2/movie/weekly',
            //   url: app.globalData.basicApi + '/v2/movie/top250',
            url: app.globalData.basicApi + _this.data.apiUrl,
            method: 'GET',
            header: {
                'Content-Type': "application/xml"
            },
            // data: _this.data.nowMovie,
            success: function (res) {
                wx.hideLoading()
                console.log(res)
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
                if (res.statusCode == 200 && res.errMsg == "request:ok") {
                    _this.setData({
                        contentTitle: res.data.title
                    })
                    for (var i = 0; i < res.data.subjects.length; i++) {
                        directorArr = []
                        locationArr = []
                        castArr = []
                        for (var j = 0; j < res.data.subjects[i].subject.directors.length; j++) {
                            directorArr.push(res.data.subjects[i].subject.directors[j].name)
                            if (res.data.subjects[i].subject.directors[0].name.indexOf('·') > -1) {
                                homeListItem.directors = directorArr[0]
                            } else {
                                homeListItem.directors = directorArr.join(' ')
                            }
                        }
                        for (var j = 0; j < res.data.subjects[i].subject.casts.length; j++) {
                            castArr.push(res.data.subjects[i].subject.casts[j].name)
                            if (res.data.subjects[i].subject.casts[0].name.indexOf('·') > -1) {
                                homeListItem.casts = castArr[0]
                            } else {
                                homeListItem.casts = castArr.join(' ')
                            }
                        }
                        locationArr.push(res.data.subjects[i].subject.pubdates[0])
                        homeListItem.location = locationArr.join(' ')
                        homeListItem.img = res.data.subjects[i].subject.images.small
                        homeListItem.name = res.data.subjects[i].subject.title
                        homeListItem.rate = res.data.subjects[i].subject.rating.average
                        homeListItem.id = res.data.subjects[i].subject.id
                        _this.data.homeList.push(homeListItem)
                        _this.setData({
                            homeList: _this.data.homeList,
                            hideBox: false
                        })
                        imgArr.push(res.data.subjects[i].subject.images.medium)
                    }
                    if (_this.data.imgBool == true) {
                        _this.setData({
                            imgArr: imgArr,
                            imgBool: false
                        })
                    }
                    if (res.data.subjects.length == 0) {
                        wx.showToast({
                            title: '已加载完全部'
                        })
                        _this.setData({
                            hideBox: true
                        })
                    }
                }
            }
        })
    },
    toDetail(e) {
        // 点击跳转页面并将点击的当前电影的id传到详情页
        var itemId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../detail/detail?id=' + itemId,
        })
        console.log(e.currentTarget.dataset.id)
    },
    getMore() {
        wx.showLoading({
            title: '玩命加载中...'
        })
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