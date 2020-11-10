window.onload = () => {
    window.addEventListener("resize", function () {
        windowResize();
      });
    
      var check;
    
      function windowResize() {
        clearTimeout(check);
        
        check = setTimeout(function () {
    
            // ваша функция
    
        }, 100);
      }
};