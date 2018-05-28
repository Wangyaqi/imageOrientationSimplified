if(!Object.assign) {
	Object.defineProperty(Object, "assign", {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function(target, firstSource) {
			"use strict";
			if(target === undefined || target === null)
				throw new TypeError("Cannot convert first argument to object");
			var to = Object(target);
			for(var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if(nextSource === undefined || nextSource === null) continue;
				var keysArray = Object.keys(Object(nextSource));
				for(var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if(desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
				}
			}
			return to;
		}
	});
}

function imageOrientationSimp(options) {
	var default_opts = {
		file: '', //必须
		compress: false,
		maxwidth: 1000,
		callback: function() {

		}
	};
	options = Object.assign(default_opts, options);
	EXIF.getData(options.file, function() {
		var orien = EXIF.getTag(this, 'Orientation') || 1;
		var reader = new FileReader();
		reader.onload = function(e) {
			var img = new Image();
			img.onload = function() {
				var w = options.compress ? Math.min(options.maxwidth, img.width) : img.width,
					h = img.height * w / img.width,
					canvas = document.createElement("canvas"),
					ctx = canvas.getContext("2d");
				switch(orien) {
					case 0:
						canvas.width = w;
						canvas.height = h;
						ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
						break;
					case 1:
						canvas.width = w;
						canvas.height = h;
						ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
						break;
					case 6:
						canvas.width = h;
						canvas.height = w;
						ctx.save();
						ctx.translate(h / 2, w / 2);
						ctx.rotate(Math.PI / 2);
						ctx.drawImage(img, 0, 0, img.width, img.height, -w / 2, -h / 2, w, h);
						ctx.restore();
						break;
					case 8:
						canvas.width = h;
						canvas.height = w;
						ctx.save();
						ctx.translate(h / 2, w / 2);
						ctx.rotate(-Math.PI / 2);
						ctx.drawImage(img, 0, 0, img.width, img.height, -w / 2, -h / 2, w, h);
						ctx.restore();
						break;
					case 3:
						canvas.width = w;
						canvas.height = h;
						ctx.save();
						ctx.translate(w / 2, h / 2);
						ctx.rotate(Math.PI);
						ctx.drawImage(img, 0, 0, img.width, img.height, -w / 2, -h / 2, w, h);
						ctx.restore();
						break;
					default:
						canvas.width = w;
						canvas.height = h;
						ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
						break;
				}
				var base64str = canvas.toDataURL("image/jpeg");
				options.callback(base64str, canvas);
			}
			img.src = e.target.result;
		};
		reader.readAsDataURL(options.file);
	});
}