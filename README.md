# imageOrientationSimplified
根据exif信息旋转图片到正常方向，简化之后同样能处理大多数情况，处理速度相比之前更快  
## 使用
引入exif.js，imageOrientationSimp.js  
### html代码
```
<input id="pic_input" type="file" accept="image/*" name="" id="" value="" />
<img id="show" />
```  
### js代码
```
document.getElementById("pic_input").onchange = function(e) {
  var files = e.target.files;
  if(files.length <= 0) {
    return false;
  } else {
    imageOrientationSimp({
      file: files[0],//要处理的图片
      compress: true,//是否压缩
      maxwidth: 2000,//压缩之后最大宽度
      callback: function(base64str, canvas) {
        document.getElementById("show").src = base64str;
      }
    });
  }
}
```  
