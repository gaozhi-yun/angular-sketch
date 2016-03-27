var sketch=angular.module('sketch',[]);
sketch.controller('sketchController', ['$scope', function($scope){
	 $scope.canvasWH={width:600,height:600};  
     $scope.csState = {
    	style:'stroke',
    	fillStyle:'#ff0000',
    	strokeStyle:'#00ff00',
    	lineWidth:2,

    }
    var previous;
    $scope.setStyle = function(s){
    	$scope.csState.style = s;
    }
    
     $scope.tool='line';
     $scope.tools={
     	'画线':'line',
     	'画圆':'arc',
     	'矩形':'rect',
     	'橡皮':'erase',
     	'铅笔':'pen',
     	'选择':'select'
     }
     $scope.settool=function(tool){
    	$scope.tool=tool;
    }
      var
	  canvas=document.querySelector('#canvas');
	  ctx=canvas.getContext('2d');
      
      var saveCurrentImage = function(){
      	previous = ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
      }
      var clearCanvas=function(){
	     ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
     }

	 //var w=ev.offsetX-e.offsetX;
	 //var h=ev.offsetY-e.offsetY;
	 //ctx.strokeRect(e.offsetX,e.offsetY,w,h)
	 //ctx.stroke();
     
     
     var setmousemove={
	    line:function(e){
		 	    canvas.onmousemove = function(ev){
		 		clearCanvas();
		 		if(previous){
		 			ctx.putImageData(previous,0,0)
		 		};
		 		ctx.beginPath();
		 		ctx.moveTo(e.offsetX,e.offsetY);
		 		ctx.lineTo(ev.offsetX,ev.offsetY);
		 		ctx.stroke();
		 	    }
     	},
     	arc:function(e){
                canvas.onmousemove=function(ev){
		 		clearCanvas();
		 		if(previous){
		 			ctx.putImageData(previous,0,0)
		 		};
		 		ctx.beginPath();
		 		var r=Math.abs(ev.offsetX-e.offsetX);
	 		    ctx.arc(e.offsetX,e.offsetY,r,0,Math.PI*2);
	 		    if($scope.csState.style=='fill'){
		 			ctx.fill();
		 		}else{
		 			ctx.stroke();
		 		}
		    }
     	}, 
     	rect:function(e){
		 	    canvas.onmousemove=function(ev){
		 		clearCanvas();
		 		if(previous){
		 			ctx.putImageData(previous,0,0)
		 		};
		 		 var w=ev.offsetX-e.offsetX;
	             var h=ev.offsetY-e.offsetY;
	             ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,w,h)
	             if($scope.csState.style=='fill'){
		 			ctx.fillRect(e.offsetX-0.5,e.offsetY-0.5,w,h)
		 		}else{
		 			ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,w,h)
		 		}
		 		
		    }
     	},
     	erase:function(e) {
			canvas.onmousemove = function(ev){
				ctx.clearRect(ev.offsetX,ev.offsetY,20,20);
			}
		},
     	pen:function(e){
     		    clearCanvas();
     		    ctx.beginPath();
		 		ctx.moveTo(e.offsetX,e.offsetY);
		 	    canvas.onmousemove=function(ev){
		 		clearCanvas();
		 		if(previous){
		 			ctx.putImageData(previous,0,0)
		 		};
		 		
		 		ctx.lineTo(ev.offsetX,ev.offsetY);
		 		ctx.stroke();
		 	    }
     	},
     
     select:function(e){
     	console.log('select');
     }
 }
 $scope.newSketch = function(){
    	if(previous){
           if(confirm('是否保存')){
           	location.href = cancvas.toDstaURL();
           }
    	}
    	clearCanvas();
    	previous = null;
    };
    $scope.save=function(ev){
       if(previous){
       	ev.srcElement.href=canvas.toDstaURL();
       	ev.srcElement.download='mapating.png';

       }else{
       	alert('空画板')
       }
    }
	 canvas.onmousedown=function(e){
	 	ctx.strokeStyle = $scope.csState.strokeStyle;
	 	ctx.fillStyle   = $scope.csState.strokeStyle;
	 	ctx.lineWidth   = $scope.csState.lineWidth;
	 	setmousemove[$scope.tool](e);
	 	document.onmouseup=function(){
	 		canvas.onmousemove=null;
	 		saveCurrentImage();
	 	}
	 }
}])