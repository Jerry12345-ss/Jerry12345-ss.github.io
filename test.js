// Nav Click to Scroll Section
const  ScrollNav = () =>{
    $('nav a').on('click',function(event){
        var section = $(this).data('nav-section');  // 抓取 nav a(this) data 屬性中 nav-section 的資料

        console.log(section);

        if($('[data-nav-section = "'+section+'"]').length){  // length 是否大於 0
            // console.log($('[data-nav-section = "'+section+'"]'));

            $('html,body').animate({
                scrollTop: $(`[data-section = ${section}]`).offset().top - 50   // 將 html / body 移動至 data-section = section (透過 offset.top() 取得 data-section 的 Y 座標)
            },800);
        }

        event.preventDefault();
        return false;

        // 測試程式碼請看 test.html => Javascript 區域
    })
}

ScrollNav();

// Nav Active
const navActive = function(section) {
    var $el = $('nav ul');  // https://stackoverflow.com/questions/10204606/is-there-any-specific-reason-behind-using-with-variable-in-jquery

    $el.find('li').removeClass('active'); // find() : 於當前元素找尋指定元素，以範例為例 => 於 $el(nav ul) 找尋元素 li ，對其 li 進行 removeClass
    // javascript 的 find() 用於陣列，與 jQuery 的 find() 不同

    $el.each(function(){  // $el.each => 針對ul => 全部的 li
        // 此處的 $(this) => $('nav ul'), closest() : 從當前元素開始，沿著 DOM 樹向上返回第一個父元素
        $(this).find(`a[data-nav-section=${section}]`).closest('li').addClass('active'); 
        // 此處從 nav ul 底下找尋元素 a 屬性 data-nav-section，從元素 a 向上選擇第一個父元素 li，為此 li 增加 Class 名稱
    }); 
};
navActive();

var navigationSection = function() {
    var $section = $('section[data-section]'); // 可以 concole.log 看看與 $('section').data('section')
    // jQuery.fn.init(3) [section#section1.content, section#section2.content, section#section3.content, prevObject: jQuery.fn.init(1)]
    
    $section.waypoint(function(direction) {
          if (direction === 'down') {
            navActive($(this.element).data('section'));
          }
    }, {
          offset: '150px'
    });

    $section.waypoint(function(direction) {
          if (direction === 'up') {
            navActive($(this.element).data('section'));
          }
    }, {
          offset: function() { return -$(this.element).height() + 155; }
    });

};

navigationSection();