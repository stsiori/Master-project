  var m=3, n=4;
  var m0=0, n0=0;
  var mmn=0;
  var a=[];
  var b=[];
  var c=[];
  var l=[];
  var u=[];
  var vb=[];
  var lb=[];
  var ub=[];
  var basics=[];
  var obj;
  var element;
  var method;
  var xlabel = [], wlabel = [], llabel=[], ulabel=[],lblabel=[],ublabel=[];
  method = "Primal";

  var ctx = null;

  var rowlist = [];
  var collist = [];
  var listlen;
var nblist=[];
  var blist=[];
var lowlist=[];
  var uplist=[];

  var fmt="Fraction";
  var vis="Visible";
  var width=0;
  var precision=8;

  var xlo, xhi, ylo, yhi, plotwid;

  var meg, bark, dothat, switchL,switchU,finiteB, pivotF;
  // FOLLOWING LINES ARE TO TEST THE BROWSWER SINCE meg.load() DOESN'T WORK IN
  // CHROME
  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) 
	|| !!window.opera 
	|| navigator.userAgent.indexOf(' OPR/') >= 0;
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
  // Safari 3.0+ "[object HTMLElementConstructor]" 
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 
  || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] 
  || safari.pushNotification);
  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;
  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;


  var sub = [];

  sub[0] = "\u2080"; sub[1] = "\u2081"; sub[2] = "\u2082"; sub[3] = "\u2083"; sub[4] = "\u2084";
  sub[5] = "\u2085"; sub[6] = "\u2086"; sub[7] = "\u2087"; sub[8] = "\u2088"; sub[9] = "\u2089";
  for (i=1; i<10; i++) {
      for (j=0; j<10; j++) {
	  sub[10*i + j] = sub[i]+sub[j];
      }
  }

  function add(type,name,width,row,rw,clas,id) {
  
	  //Create an input type dynamically.
	  element = document.createElement("input");
  
	  //Assign different attributes to the element.
	  element.setAttribute("type", type);
	  element.setAttribute("value", name);
	  element.setAttribute("name", name);
	  element.setAttribute("size", width);
	  element.setAttribute("class", clas);
	  element.setAttribute("onchange", "ck_edits(); toGrid()");
	  element.setAttribute("id", id);
	  if (rw == "readonly") { 
	      element.setAttribute("readonly","");
	  }
         if (type == "text" && clas != "sign" && clas != "var") {
              element.setAttribute("onmouseover", "ck_edits(); toGrid()");
              element.setAttribute("onmouseleave", "ck_edits(); toGrid()");
          }
  
  
	  var rowElement = document.getElementById("rowStuff"+row);
  
	  //Append the element in page (in span).
	  rowElement.appendChild(element);
  
  }


  function removeElements(elements) {
	  for (var i=0; i<elements.length; i++) {
		elements[i].parentNode.removeChild(elements[i]);
	  }
  }
  
  function setm(v) { 
	  m = 1*v.valueOf(); 
	  if (m>18) {
	    m=18;
            document.getElementById("m").value = m;
	  }
	
	  start();
  }
  function setn(v) { 
	  n0 = n;
	  n = 1*v.valueOf(); 
	  start();
	     plotcanvas = document.getElementById("plot2d");
	     ctx = plotcanvas.getContext('2d');
	     ctx.canvas.height = "0";
	     ctx.canvas.width = "0";
	  
          console.log("setn");
          toGrid();
  }
  function setMethod(v) { method = v.valueOf(); start();}

  function setFormat(v) { 
          var ctr_right;
          fmt = v.valueOf(); 
          if (fmt == "Fraction") {ctr_right = "center";} else {ctr_right = "right";}
          if (document.getElementById("zstar") != null) 
              document.getElementById("zstar").style.textAlign = ctr_right; 
          for (i=1; i<=m; i++) {
	      document.getElementById("b"+i).style.textAlign = ctr_right;
           document.getElementById("vb"+i).style.textAlign = ctr_right;
              for (j=1; j<=n; j++) {
		  document.getElementById("a"+i+","+j).style.textAlign = ctr_right;
          
              }
              }
              for (j=1; j<=n; j++) {
              document.getElementById("l"+(m+1)+","+j).style.textAlign = ctr_right;}
               for (j=1; j<=n; j++) {
              document.getElementById("u"+(m+2)+","+j).style.textAlign = ctr_right;}
          for (j=1; j<=n; j++) { document.getElementById("c"+j).style.textAlign = ctr_right; }
           for (j=1; j<=m; j++) { document.getElementById("ub"+j).style.textAlign = ctr_right; }
          for (j=1; j<=m; j++) { document.getElementById("lb"+j).style.textAlign = ctr_right; }
          console.log("setFormat");
          toGrid();
  }
  function setVisibility(v) { vis = v.valueOf(); toGrid();}
  function setExercise(v) {
          n0 = n;
	  obj = 0;

	  if (v.valueOf() == "--") {
	      start();
	      for (j=1; j<=n; j++) { c[j] = 0;l[j] = 0;u[j]=0; }
	      for (i=1; i<=m; i++) {
	         for (j=1; j<=n; j++) { a[i][j] = 0;}
	         b[i] = 0; vb[i]=0; lb[i]=0;ub[i]=0;}
          
             
	  } else {}
	 
          console.log("setExercise");
	  toGrid();
  }

  function xpx(x) { return plotwid*(x+2)/11;  }
  function ypx(y) { return plotwid - plotwid*(y+2)/11;  }

  function pxx(x) { return 11*x/plotwid;  }
  function pxy(y) { return 11*y/plotwid;  }

 
   function genrand() {
	var xinit = [];
	var winit = [];
	var zinit = [];
	var yinit = [];
	var lower=0;
	var upper=0;
    

if(n>2){  
for(i=1;i<=2;i++){ 
     element=document.getElementById("l"+(m+1)+","+i);
      element.className="orangeval";}
     for(j=3;j<=n;j++){element=document.getElementById("u"+(m+2)+","+j); element.className = "purpleval";}
    }
    else if(n==1){document.getElementById("l"+(m+1)+","+1).className = "purpleval";}else{document.getElementById("l"+(m+1)+","+1).className= "purpleval";document.getElementById("u"+(m+2)+","+2).className = "orangeval";}


// ==================================================
	for (i=1; i<=m; i++) { a[i] = [];}
 

	var scale, shift;
	scale = (m+2)+n; shift = Math.floor(scale/2); 
    for(j=1;j<=n;j++){
    l[j]=-1* Math.floor(scale*myrand());
    u[j]=Math.floor(scale*myrand());
    }
    
	   for (i=1; i<=m; i++) {
		for (j=1; j<=n; j++) {
		    a[i][j]  = Math.floor(scale*myrand())-shift;
		    a[i][j] += Math.floor(scale*myrand())-shift;
		    a[i][j] += Math.floor(scale*myrand())-shift;
		}
	    }
 
	if ( myrand() < 0.3 ) { scale = (m+n); shift = Math.floor(scale/2); }
	                 else { scale = (m+n)/2; shift = 0; }
	if (method != "Dual") {
	    for (j=1; j<=n; j++) {
		xinit[j] = Math.floor(scale*myrand())-shift;
		zinit[j] = Math.floor(scale*myrand())-3*shift;
       
	    }
	    for (i=1; i<=m; i++) {
		winit[i] = Math.floor(scale*myrand())-3*shift; 
		yinit[i] = Math.floor(scale*myrand())-shift; 
	    }
	}
	

	var seed0 = document.getElementById("seed").value;
	for (j=1; j<=n; j++) {
		c[j] = -zinit[j];
		for (i=1; i<=m; i++) {
		    c[j] -= yinit[i]*a[i][j];
		}
	        if ((method == "Dual"   && seed0 <  10000) || 
		    (method == "Primal" && seed0 >= 10000)) {
		    c[j]  = Math.floor((m+n)*myrand());
		    c[j]  += Math.floor((m+n)*myrand());
		    c[j]  += Math.floor((m+n)*myrand());
		    c[j]  *= -1;
		}
	}
    
   for (j=1; j<=m; j++) {
		lb[j] = 0;}
        for (j=1; j<=m; j++) {
		ub[j] = Infinity;}

	
	
	for (i=1; i<=m; i++) {
		b[i] = winit[i];
		for (j=1; j<=n; j++) {
		    b[i] -= a[i][j]*xinit[j];
		}
       
		
	        if ((method == "Primal" && seed0 <  10000) || 
		    (method == "Dual"   && seed0 >= 10000)) {
		    b[i]  = Math.floor((m+n)*myrand());
		    b[i]  += Math.floor((m+n)*myrand());
		    b[i]  += Math.floor((m+n)*myrand());
		}
	}

     
	if (n==2 && method == "Primal" && myrand() < 0.8) {
		var xcenter = 1.0 + myrand()*m/9;
		var ycenter = 1.0 + myrand()*m/9;
		var r = 1.25*Math.sqrt(xcenter*xcenter+ycenter*ycenter);;
		var theta;
		var x0, y0;
		var nx, ny;
		for (i=1; i<=m; i++) {
			theta = 1.5*Math.PI*(i-myrand())/m - Math.PI/2;
			nx = r*Math.cos(theta);
			ny = r*Math.sin(theta);
			x0 = xcenter + nx;
			y0 = ycenter + ny;
			a[i][1] = -nx;
			a[i][2] = -ny;
			b[i] = nx*x0 + ny*y0;
			a[i][1] = Math.round(5*a[i][1]);
			a[i][2] = Math.round(5*a[i][2]);
			b[i]    = Math.round(5*b[i]);
		}
	}

	// ==================================================

for(i=1;i<=m;i++){vb[i]=vbval(i);}

obj = 0;

	listlen = 0;
	for (var i=0; i<100; i++) rowlist[i] = -1;
	for (var i=0; i<100; i++) uplist[i] = -1;
for (var i=0; i<100; i++) lowlist[i] = -1;

	
	for (j=1; j<=n; j++) {
	     document.getElementById("x0,"+j).value = xlabel[j]; // +" ";
	    // var wid = document.getElementById("x0,"+j).value.visualLength() + 30;
             for (i=0; i<=m+2; i++) {
	         document.getElementById("x"+i+","+j).value = xlabel[j]; // +" ";
                 var element = document.getElementById("x"+i+","+j);
                // element.style.width = wid+"px";
             }
	}


	toGrid();

  } 

function vbval(i){
var uz=[];var lz=[];
 for (j=1; j<=n; j++)
     { element=document.getElementById("l"+(m+1)+","+j);
       var element1=document.getElementById("u"+(m+2)+","+j);
       if(element.className=="orangeval")
          {lz[j]=j;}
       if( element1.className=="purpleval")
          {uz[j]=j;}
     }     
var uf=uz.filter(x=>x!=null);
var lf=lz.filter(x=>x!=null);
var vbj=0; var vb=0;
       for (j of lf) {
            vbj+=a[i][j]*l[j];}
       for (k of uf) {  
            vb+=a[i][k]*u[k];}
return b[i]+vbj+vb;
}
  function Undo() {
	var row, col, bsc, nbsc, lowl,upl;

	if (listlen > 0) { listlen--; } else { listlen = 99; }
	row = rowlist[listlen];
	col = collist[listlen];
        bsc= blist[listlen];
	nbsc=nblist[listlen];
        lowl= lowlist[listlen];
	upl=uplist[listlen];
	if (row !=-1) {
		pivot(row,col);
		if ((bsc=="ub" && nbsc=="u")||(bsc=="lb" && nbsc=="u")) {
			document.getElementById("u"+(m+2)+","+col).className="purpleval";
                        document.getElementById("l"+(m+1)+","+col).className="val";
		}
		else if ((bsc=="lb" && nbsc=="l")||(bsc=="ub" && nbsc=="l") ){
			document.getElementById("l"+(m+1)+","+col).className="orangeval";
                        document.getElementById("u"+(m+2)+","+col).className="val";
		} 
	}
/*if (col!=-1 || col==-1) { 

if (upl=="uc"){
		document.getElementById("l"+(m+1)+","+col).className="orangeval";
                document.getElementById("u"+(m+2)+","+col).className="val";
		toGrid();}
if (upl=="uco" && u[col]!=Infinity){
                document.getElementById("u"+(m+2)+","+col).className="purpleval";
		toGrid();}
if (upl=="ucv"){
                document.getElementById("u"+(m+2)+","+col).className="val";
		toGrid();}

if (lowl=="lc"){
		document.getElementById("u"+(m+2)+","+col).className="purpleval";
                document.getElementById("l"+(m+1)+","+col).className="val";
		toGrid();}
if (lowl=="lco" && l[col]!=-Infinity){
                document.getElementById("l"+(m+1)+","+col).className="orangeval";
		toGrid();}
if (lowl=="lcv"){
                document.getElementById("l"+(m+1)+","+col).className="val";
		toGrid();}
}*/

}
   function Hint() {
	var tmp, eps=1e-6;

	
if (method == "Primal") {
var colov=[];
	
	for (i=1; i<=m; i++) {
		element=document.getElementById("vb"+i);
                         colov[i]=window.getComputedStyle(element).backgroundColor;
	
			}
 var coloc=[];
	
	for (i=1; i<=n; i++) {
		element=document.getElementById("c"+i);
                         coloc[i]=window.getComputedStyle(element).backgroundColor;}

			if ( colov.indexOf("rgb(255, 170, 255)")!= -1) {  
for (i=1; i<=m; i++){element=document.getElementById("vb"+i);
if ( element.className==="pinkval" ){
				for (j=1; j<=n; j++) {
		    		 var element1 =document.getElementById("x"+i+","+j);
					var element2 =document.getElementById("u"+(m+2)+","+j);
                    var element3 =document.getElementById("l"+(m+1)+","+j);
    
                if((c[j] > 1e-10 && element3.className=="orangeval")||(c[j] < 1e-10 && element2.className=="purpleval")){	
                element1.className = "greenvar";}
                }}}

			}
		
	else
	{for (j=1; j<=n; j++) {
        		var element1=document.getElementById("l"+(m+1)+","+j);
       			var element2=document.getElementById("u"+(m+2)+","+j);
		if(element1.className==="orangeval" && c[j]>eps){ 
				tmp = 1e+10;
				for (i=1; i<=m; i++) {
		  			if (a[i][j] < -eps && -vb[i]/a[i][j] < tmp) {
		    				tmp = -vb[i]/a[i][j];
		  			}
				}
				for (i=1; i<=m; i++) {
		  			if (a[i][j] < -eps && -vb[i]/a[i][j] < tmp+eps) {
		    				document.getElementById("x"+i+","+j).className = "greenvar";

		  			}
				}
	      		}
			if(element2.className==="purpleval" && c[j]<-eps){
				tmp = 1e+10;
				for (i=1; i<=m; i++) {
		  			if (a[i][j] > eps && vb[i]/a[i][j] < tmp) {
		   				tmp = vb[i]/a[i][j];
		  				}
					}
				for (i=1; i<=m; i++) {
		  			if (a[i][j] > eps && vb[i]/a[i][j] < tmp+eps) {
		    				document.getElementById("x"+i+","+j).className = "greenvar";

		  			}
				}
	     		}
	   	}
	}

} 

setTimeout(function(){  for(i=1;i<=m;i++){for(j=1;j<=n;j++){document.getElementById("x"+i+","+j).className= "butvar";}}},300);

  }


  function updateColLabels(j) {
	var tmp0, tmp1, tmp2;
        var element = document.getElementById("x0,"+j);
      
	var newvalue = element.value;
    
	
	for (k=newvalue.length-1; k>0; k--) {
	    tmp0 = newvalue.substring(0, k);
	    tmp1 = newvalue.substring(k, k+1);
	    if (k<newvalue.length) {
		tmp2 = newvalue.substring(k+1, newvalue.length);
	    } else {
		tmp2 = null;
	    }
	    var c = tmp1.charAt(0);
	    if (c > '/' && c < ':') {
		k = parseInt(tmp1);
		newvalue = tmp0 + sub[k] + tmp2;
	    }
	}

        element.value = newvalue;
      
        var newwid = element.value.visualLength() + 20;
      
	for (i=0; i<=m+2; i++) {
	    var element = document.getElementById("x"+i+","+j);
	    element.value = newvalue;
            element.style.width = newwid+"px";
	}
    
	toGrid();
  }

  function updateRowLabel(i) {
	var tmp0, tmp1, tmp2;
	var element = document.getElementById("w"+i);
	var newvalue = element.value;
	for (k=newvalue.length-1; k>0; k--) {
	    tmp0 = newvalue.substring(0, k);
	    tmp1 = newvalue.substring(k, k+1);
	    if (k<newvalue.length) {
		tmp2 = newvalue.substring(k+1, newvalue.length);
	    } else {
		tmp2 = null;
	    }
	    var c = tmp1.charAt(0);
	    if (c > '/' && c < ':') {
		k = parseInt(tmp1);
		newvalue = tmp0 + sub[k] + tmp2;
	    }
	}
        element.value = newvalue;

        var newwid = element.value.visualLength();
	var element = document.getElementById("obj");
	if (element != null) { newwid = Math.max(newwid, element.value.visualLength());}
	for (i=1; i<=m; i++) {
	    var element = document.getElementById("w"+i);
	    newwid = Math.max(newwid, element.value.visualLength());
	}
        newwid += 20;
	var element = document.getElementById("obj");
	if (element != null) { element.style.width = newwid+"px";}
	for (i=1; i<=m; i++) {
	    var element = document.getElementById("w"+i);
	    element.style.width = newwid+"px";
	}

	toGrid();
  }

  var first_call = true;

  function start() {
	var i,j;
	var element, rowElement;
        var tmp;

	obj = 0;

	n = 1.*document.getElementById("n").value;

	for (i=0; i<=m0+4; i++) {
	    removeElements(document.querySelectorAll("#rowStuff"+i+" input"));
	    removeElements(document.querySelectorAll("#rowStuff"+i+" br"));
	}
	
    
	m0 = m;
	// fmt = "Decimal";
	seed = 0;
        document.getElementById("seed").value = seed;

	listlen = 0;
	for (var i=0; i<100; i++) rowlist[i] = -1;
	for (var i=0; i<100; i++) uplist[i] = -1;for (var i=0; i<100; i++) lowlist[i] = -1;

	if (method == "Primal") {
            for (j=1; j<=n; j++) { xlabel[j] = "x"+sub[j]; }
            for (i=1; i<=m; i++) { wlabel[i] = "w"+sub[i]; }
	}
	
	
	    zlabel = "\u03B6";
	
     add("text","",1 ,0,"readonly"        ,"sign" ,"md0"  );
   
 

        document.getElementById("md0").style.textAlign = "right";
      
	add("text","" +zlabel+ " ",1,0,"readonly","val"   ,"obj"   );
    document.getElementById("obj").style.textAlign = "center";
	add("text"," = "     ,3,0,"readonly","equals","e0"      );
	
	    add("text","0"       ,5 ,0,""        ,"val" ,"zstar");
	
	for (j=1; j<=n; j++) {
	    
	    add("text","  +"    ,3 ,0,"readonly","sign","plus"+j );
	    
	    add("text","0"       ,5 ,0,""        ,"val" ,"c"+j  );

	    add("text",xlabel[j],3 ,0,"","var" ,"x0,"+j);
        
       
          
        
	    element = document.getElementById("x0,"+j);
           
	    element.setAttribute("onchange","updateColLabels("+j+")");
	}add("text","  "    ,1 ,0,"readonly","sign","e"  );
         add("button"  ,"vb"           ,1 ,0,"readonly","butvar" ,"vb"+0 );

           add("text","  "    ,1 ,0,"readonly","equals","e"  );
add("button","lb",1 ,0,"","butvar"  ,"lb"+0);
     add("text",""       ,1 ,0,"readonly","sign" ,"e"  );
   
    
   
     add("button","ub",1 ,0,"","butvar" ,"ub"+0);
      add("text"," "    ,1 ,0,"readonly","sign","e" );
  

	   
	        var element = document.getElementById("lb"+0);
	        element.setAttribute("onclick","lbgotChoice()");
	    
	
	        var element1 = document.getElementById("ub"+0);
	        element1.setAttribute("onclick","ubgotChoice()");

	for (i=1; i<=m; i++) {
     
      add("text","",1,i,"readonly","sign","mb"+i);
            document.getElementById("mb"+i).style.textAlign = "right";
     
    
	    add("text",wlabel[i],1 ,i,"","val"   ,"w"+i);   
	    element = document.getElementById("w"+i);
        element.style.textAlign = "center";

	    element.setAttribute("onchange","updateRowLabel("+i+")");
         add("text"," = "    ,3 ,i,"readonly","equals","e"+i   );
         
	     add("text","0"       ,5 ,i,""        ,"val"   ,"b"+i);  
	    for (j=1; j<=n; j++) {
		
                     
                    add("text"  ,"  -"        ,3,i,"readonly","sign" ,"minus"+i+","+j   );
                    tmp = document.getElementById("minus"+i+","+j);
                    tmp.style.backgroundColor = "#F8F8F8";
	            add("text"  ,"0"           ,5 ,i,""        ,"val"   ,"a"+i+","+j);
                    tmp = document.getElementById("a"+i+","+j);
                    tmp.style.backgroundColor = "#F8F8F8";
		    add("button",xlabel[j]+" ","",i,""        ,"butvar"   ,"x"+i+","+j);

		
	    } add("text"," = "    ,1 ,i,"readonly","equals","e"+i   );
         add("text"  ,"0"           ,1 ,i,""    ,"val"   ,"vb"+i);
          add("text","  "    ,1 ,i,"readonly","equals","e"+i   );
add("text","0",1 ,i,"","val"   ,"lb"+i);
 
     add("text",""       ,1 ,i,"readonly"        ,"sign" ,"e"  );
   
     add("text","0",1 ,i,"","val"   ,"ub"+i);

      add("text"," "    ,1 ,i,"readonly","sign","e"  );
  
          element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+i);
	rowElement.appendChild(element);
	}
   
	for (i=1; i<=m; i++) {
	    for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+i+","+j);
	        element.setAttribute("onclick","gotClicked("+i+","+j+")");
	    }
	}
   

        add("text","",1,m+1,"readonly","sign","mb"+(m+1));
            document.getElementById("mb"+(m+1)).style.textAlign = "right";
        
          add("text","  "     ,1,m+1,"readonly","sign","e0"      );
  
	add("text","  "     ,3,m+1,"readonly","sign","e0"      );
	
	    add("text","  "     ,5,m+1,"readonly","sign","e0"      );
	
   
     for (j=1; j<=n; j++) {
		
                   
                    
                    add("text"  ,"  "        ,3,m+1,"readonly","sign" ,"minus"+(m+1)+","+j   );
                  
	            add("text"  ,"0"           ,5,m+1,""        ,"val"   ,"l"+(m+1)+","+j);
                    
		    add("button",xlabel[j]+"",3,m+1,"","butvar"   ,"x"+(m+1)+","+j);
		
	    } add("text","  "    ,1 ,m+1,"readonly","sign","e"  );
         add("text"  ,""           ,1 ,m+1,"readonly","sign" ,"vb"+(m+1) );
           add("text","  "    ,1 ,m+1,"readonly","equals","e"  );
add("text","",1 ,m+1,"readonly","sign"  ,"lb"+(m+1));
     add("text",""       ,1 ,m+1,"readonly","sign" ,"e"  );
   
     
   
     add("text","",1 ,m+1,"readonly","sign" ,"ub"+(m+1));
      add("text"," "    ,1 ,m+1,"readonly","sign","e" );


           add("text","",1,m+2,"readonly","sign","mb"+(m+2));
            document.getElementById("mb"+(m+2)).style.textAlign = "right";
          add("text","  "     ,1,m+2,"readonly","sign","e0"      );
  
	add("text","  "     ,3,m+2,"readonly","sign","e0"      );
	
	    add("text","  "     ,5,m+2,"readonly","sign","e0"      );

     for (j=1; j<=n; j++) {
                    
                    add("text"  ,"  "        ,3,m+2,"readonly","sign" ,"minus"+(m+2)+","+j   );
                  
	            add("text"  ,"0"           ,5,m+2,""        ,"val"   ,"u"+(m+2)+","+j);
                  
		    add("button",xlabel[j]+"","",m+2,"","butvar"   ,"x"+(m+2)+","+j);
		
	    } add("text","  "    ,1 ,m+2,"readonly","sign","e"  );
         add("text"  ,""           ,1 ,m+2,"readonly","sign" ,"vb"+(m+2) );
           add("text","  "    ,1 ,m+2,"readonly","equals","e"  );
add("text","",1 ,m+2,"readonly","sign"  ,"lb"+(m+2));
     add("text",""       ,1 ,m+2,"readonly","sign" ,"e"  );
   
    
   add("text","",1 ,m+2,"readonly","sign" ,"ub"+(m+2));
      add("text"," "    ,1 ,m+2,"readonly","sign","e" );

    
	    element = document.createElement("br");
	    rowElement = document.getElementById("rowStuff"+(m+2));
	    rowElement.appendChild(element);
          element = document.createElement("br");
	    rowElement = document.getElementById("rowStuff"+(m+2));
	    rowElement.appendChild(element);

    
	add("button", "", 80, m+3, "readonly", "val", "basicvars");
	add("button", "", 80, m+4, "readonly", "val", "nonbasicvars");
	for (i=1; i<=m; i++) {
	    for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+i+","+j);
	        element.setAttribute("onclick","gotClicked("+i+","+j+")");
	    }
	}


	   
	        var element = document.getElementById("lb"+0);
	        element.setAttribute("onclick","lbgotChoice()");
	    
	
	        var element1 = document.getElementById("ub"+0);
	        element1.setAttribute("onclick","ubgotChoice()");

	 for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+(m+1)+","+j);
	        element.setAttribute("onclick","lowgotChoice("+j+")");
	    }
	
 for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+(m+2)+","+j);
	        element.setAttribute("onclick","upgotChoice("+j+")");
	    }
	
	
	if (Math.random() <= 0.5) {
	    bark = new Audio("fail-trombone.mp3");
//switchL= new Audio("switchtolow.mp3");
//switchU= new Audio("switchtoup.mp3");
switchL= new Audio("movetolower.mp3");
switchU= new Audio("Movetoupper.mp3");
finiteB= new Audio("finitebound.mp3");
pivotF=new Audio("you're stuck.mp3");
meg = new Audio("Home_Run.mp3");
dothat= new Audio("clickuborlb.mp3");
	} else {
	    bark = new Audio("Tryagain.mp3");
switchL= new Audio("movetolower.mp3");
switchU= new Audio("Movetoupper.mp3");
finiteB= new Audio("finitebound.mp3");
//finiteB= new Audio("Down-to-earth.mp3");
pivotF=new Audio("oupscan'tpivot.mp3");
meg = new Audio("deduction.mp3");
//dothat=new Audio("chooseuborlb.mp3");
dothat= new Audio("clickuborlb.mp3");
	}




	



	obj = 0;
	for (j=1; j<=n; j++) {
	    c[j] = 0;
	}
	for (i=1; i<=m; i++) {
	    b[i] = 0;
	    a[i] = [];
      vb[i]=0;

        lb[i]=0;
        ub[i]=0;
      
        
	    for (j=1; j<=n; j++) {
		a[i][j] = 0;
        l[j]=0;
        u[j]=0;
        
	    }
     }
     

    

toGrid();
	


        // ==================================================

	listlen = 0;
	for (var i=0; i<100; i++) rowlist[i] = -1;
	for (var i=0; i<100; i++)  uplist[i] = -1;
for (var i=0; i<100; i++) lowlist[i] = -1;

	for (i=0; i<=m+2; i++) {

	 var wid1=  document.getElementById("lb"+0).value.visualLength()+40;
         var wid2=  document.getElementById("vb"+0).value.visualLength()+50;
         var element = document.getElementById("lb"+i);
                 element.style.width = wid1+"px";
             var element1 = document.getElementById("ub"+i);
                 element1.style.width = wid1+"px";
                   var element2 = document.getElementById("vb"+i);
                 element2.style.width = wid2+"px";
	}
           
	element = document.getElementById("obj");
        var newwid = 1;
       
        newwid += 10;
	
	for (j=1; j<=n; j++) {
	     document.getElementById("x0,"+j).value = xlabel[j];
	     document.getElementById("x"+(m+1)+","+j).value = xlabel[j];
         
	     document.getElementById("x"+(m+2)+","+j).value = xlabel[j];
       
	     var wid = document.getElementById("x"+(m+1)+","+j).value.visualLength()+20;
            
             for (i=0; i<=m+2; i++) {
	       
                 var element = document.getElementById("x"+i+","+j);
                 
                 element.style.width = wid+"px";
                 
             }
              
	}
       
	console.log("start");
	toGrid();

  }



  function gotClicked(row,col) {

	rowlist[listlen] = row;
	collist[listlen] = col;
	if (listlen < 99) { listlen++; } else {listlen=0;}
if(document.getElementById("l"+(m+1)+","+col).className=="orangeval"){
for (var i=0; i<100; i++) nblist[i] = "l";}
else if(document.getElementById("u"+(m+2)+","+col).className=="purpleval"){
for (var i=0; i<100; i++) nblist[i] = "u";}
if(a[row][col]!=0){dothat.play();
document.getElementById("x"+row+","+col).className="clickvar";

    setTimeout(function(){
        //Max timeout 
           yellowtrue(row,col);
	  document.getElementById("x"+row+","+col).className="butvar";
    }, 4000);
    
  }
else {	 element=    document.getElementById("u"+(m+2)+","+col);
    var element1=    document.getElementById("l"+(m+1)+","+col);
document.getElementById("x"+row+","+col).className="clickvar";
         if(element.className=="purpleval" && (l[col]==-Infinity )) {
	    pivotF.play();
	   setTimeout(function(){
	  document.getElementById("x"+row+","+col).className="butvar";
    }, 1000); }
	else if(element.className=="purpleval" && (l[col]!=-Infinity )){switchL.play();setTimeout(function(){
      element1.className="orangeval";element.className="val";
    }, 500);setTimeout(function(){
	  document.getElementById("x"+row+","+col).className="butvar";
    }, 1000);}
	if(element1.className=="orangeval" && (u[col]==Infinity ))
	    {pivotF.play();setTimeout(function(){
	  document.getElementById("x"+row+","+col).className="butvar";
    }, 1000); }
	else if(element1.className=="orangeval" && (u[col]!=Infinity )){switchU.play(); setTimeout(function(){
       element.className="purpleval";element1.className="val";
    }, 500);setTimeout(function(){
	  document.getElementById("x"+row+","+col).className="butvar";
    }, 1000);}

else{document.getElementById("x"+row+","+col).className="butvar";}
 
return;}		
}


 
function yellowtrue(row,col){
if(document.getElementById("lb"+0).className=="clickvar"){
lbgotClicked(row,col);}


else if(document.getElementById("ub"+0).className=="clickvar"){
ubgotClicked(row,col);}

else {return;}}

 function lbgotChoice (row,col)  {
for (var i=0; i<100; i++) blist[i] = "lb";
document.getElementById("lb"+0).className="clickvar";

    setTimeout(function(){
        //Max timeout 
         
        document.getElementById("lb"+0).className="butvar";
    }, 4000);

}

 function ubgotChoice() {
for (var i=0; i<100; i++) blist[i] = "ub";
document.getElementById("ub"+0).className="clickvar";

    setTimeout(function(){
        //Max timeout 
         
        document.getElementById("ub"+0).className="butvar";
    }, 4000);

}
 
function lowgotChoice(col) {


	collist[listlen] = col;
	if (listlen < 99) { listlen++; } else {listlen=0;}
 if((document.getElementById("l"+(m+1)+","+col).className=="orangeval")||(l[col]==-Infinity )){
for (var i=0; i<100; i++) lowlist[i] = "lco";document.getElementById("l"+(m+1)+","+col).className="val";}
   else if ((document.getElementById("l"+(m+1)+","+col).className=="val")&& (document.getElementById("u"+(m+2)+","+col).className=="val")){
for (var i=0; i<100; i++) lowlist[i] = "lcv";document.getElementById("l"+(m+1)+","+col).className="orangeval";}
else if ((document.getElementById("l"+(m+1)+","+col).className=="val")&& (document.getElementById("u"+(m+2)+","+col).className=="purpleval")){
for (var i=0; i<100; i++) lowlist[i] = "lc";document.getElementById("l"+(m+1)+","+col).className="orangeval";document.getElementById("u"+(m+2)+","+col).className="val";}
toGrid();}

 function upgotChoice(col) {

	collist[listlen] = col;
	if (listlen < 99) { listlen++; } else {listlen=0;}
   if((document.getElementById("u"+(m+2)+","+col).className=="purpleval")||(u[col]==Infinity )){
for (var i=0; i<100; i++) uplist[i] = "uco";document.getElementById("u"+(m+2)+","+col).className="val";}
   else if ((document.getElementById("u"+(m+2)+","+col).className=="val")&& (document.getElementById("l"+(m+1)+","+col).className=="val")){
for (var i=0; i<100; i++) uplist[i] = "ucv";document.getElementById("u"+(m+2)+","+col).className="purpleval";}
else if ((document.getElementById("u"+(m+2)+","+col).className=="val")&& (document.getElementById("l"+(m+1)+","+col).className=="orangeval")){
for (var i=0; i<100; i++) uplist[i] = "uc";document.getElementById("u"+(m+2)+","+col).className="purpleval";document.getElementById("l"+(m+1)+","+col).className="val";}
toGrid();}


 function lbgotClicked(row,col) {

if(lb[row]!=-Infinity){document.getElementById("l"+(m+1)+","+col).className="orangeval";
pivot(row,col);document.getElementById("u"+(m+2)+","+col).className="val";} 

else{finiteB.play();}
}

 function ubgotClicked(row,col) {

if(ub[row]!=Infinity){document.getElementById("u"+(m+2)+","+col).className="purpleval";
pivot(row,col);document.getElementById("l"+(m+1)+","+col).className="val";} 

else{finiteB.play();}
}

  function ck_edits() {
        var eps = 1e-4;
        var factor;
        if (fmt == 'Integer') factor = maxden; else factor = 1;
	if (method != "Klee-Minty") {
	  for (i=1; i<=m; i++) {
	    bb = fracDivide(document.getElementById("b"+i).value);
	    if (Math.abs(b[i] - bb/factor) > eps) {b[i] = bb/factor;}
	  }
	}

	for (j=1; j<=n; j++) {
	    cc = fracDivide(document.getElementById("c"+j).value);
	    if (Math.abs(c[j] - cc/factor) > eps) {c[j] = cc/factor;}
	}

	for (i=1; i<=m; i++) {
	    for (j=1; j<=n; j++) {
		aa = -fracDivide(document.getElementById("a"+i+","+j).value);
	        if (Math.abs(a[i][j] - aa/factor) > eps) {a[i][j] = aa/factor;}
	    }
	}

	if (method != "Klee-Minty") {
	  oo = document.getElementById("zstar").value;
	  if (Math.abs(obj - oo/factor) > eps) {obj = oo/factor;}
	}
    	if (method != "Klee-Minty") {
	  for (i=1; i<=m; i++) {
	    vbb = fracDivide(document.getElementById("vb"+i).value);
	    if (Math.abs(vb[i] - vbb/factor) > eps) {vb[i] = vbb/factor;}
	  }
	}
if (method != "Klee-Minty") {
	  for (i=1; i<=m; i++) {
	     lbb = fracDivide(document.getElementById("lb"+i).value);
	    if (Math.abs(lb[i] - lbb/factor) > eps) {lb[i] = lbb/factor;}
	  }
	  }
	
if (method != "Klee-Minty") {
	  for (i=1; i<=m; i++) {
	      ubb = fracDivide(document.getElementById("ub"+i).value);
	    if (Math.abs(ub[i] - ubb/factor) > eps) {ub[i] = ubb/factor;}
	  }
	  }
	
if (method != "Klee-Minty") {
	  for (i=1; i<=n; i++) {
	      ll = fracDivide(document.getElementById("l"+(m+1)+","+i).value);
	    if (Math.abs(l[i] - ll/factor) > eps) {l[i] = ll/factor;}
	  }
	  }
	
if (method != "Klee-Minty") {
	  for (i=1; i<=n; i++) {
	      uu = fracDivide(document.getElementById("u"+(m+2)+","+i).value);
	    if (Math.abs(u[i] - uu/factor) > eps) {u[i] = uu/factor;}
	  }
	  }
	
toGrid();
  }

  function pivot(row,col) {
		leaving  = document.getElementById("w"+row).value;
	       entering = document.getElementById("x0,"+col).value;
 

	/* PIVOT HERE */
	var arow = [];
	var acol = [];
	var arowcol;
	var brow, ccol;
	/*var basicrow;
	

	basicrow = basics[row];
	basics[row] = nonbasics[col];
	nonbasics[col] = basicrow;*/
	
	for (i=1; i<=m; i++) { acol[i] = a[i][col]; }
	for (j=1; j<=n; j++) { arow[j] = a[row][j]; }
	arowcol = a[row][col];

if (arowcol == 0) {
	    /*bark.play();
	    // THIS BLINKING CODE DOES NOT WORK
	    var element = document.getElementById("a"+row+","+col)
	    for (j=0; j<5; j++) {
		element.className = "pinkval";
		wait(200);
		element.className = "val";
		wait(200);
	    }*/
	    return;
	}
	
   document.getElementById("w"+row).value = entering;
   for (i=0; i<=m; i++) {
	     document.getElementById("x"+i+","+col).value = leaving;}
 	   
   
    
	for (i=1; i<=m; i++) {
	    for (j=1; j<=n; j++) {
		if (i != row && j != col) {
		    a[i][j] -= arow[j]*acol[i]/arowcol;
		} 
		if (i != row && j == col) {
		    a[i][j] /=  arowcol;
		} 
		if (i == row && j != col) {
		    a[i][j] /= -arowcol;
		} 
		if (i == row && j == col) {
		    a[i][j] = 1.0/arowcol;
		}
	    }
	}

	brow = b[row];
	for (i=1; i<=m; i++) {
	    if (i != row) {
		b[i] -= brow*acol[i]/arowcol;
	    } else {
		b[i] /= -arowcol;
	    }
	}

	ccol = c[col];
	for (j=1; j<=n; j++) {
	    if (j != col) {
		    c[j] -= ccol*arow[j]/arowcol;
	    } else {
		c[j] /= arowcol;
	    }
	}

	obj -= brow*ccol/arowcol;
lcol=l[col];
ucol=u[col];    
l[col]=lb[row];
    lb[row]=lcol;
    u[col]=ub[row];
    ub[row]=ucol;
	


        updateColLabels(col);
	toGrid();
}


  function ck_opt()
  {
  	var i, j;
  	var optflag=true;
  
  	for (i=1; i<=m; i++) { 
	    b[i] = fracDivide(document.getElementById("b"+i).value);
	}
  
  	for (j=mmn+1; j<=n; j++) { 
	    c[j] = fracDivide(document.getElementById("c"+j).value);
	}
  
  	for (i=1; i<=m; i++) {
  		if ((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i])) {
  			optflag = false;
  		}
  	}
  
  	for (j=mmn+1; j<=n; j++) {element=document.getElementById("l"+(m+1)+","+j);element1=document.getElementById("u"+(m+2)+","+j);
  		if ((element.className=="orangeval" && c[j] > 1e-10) || (element1.className=="purpleval" && c[j] <-1e-10)) {
  			optflag = false;
  		}
  	}
  
  	if (optflag == true) {
  		meg.play();
  	} else {
  		bark.play();
	
  	}
  }
  
  function ck_p_unbdd()
  {
  	var i, j;
  	var d_infeas_flag=false;
  	var p_feas_flag=true;
  
  	for (i=1; i<=m; i++) { 
	   vb[i] = fracDivide(document.getElementById("vb"+i).value);
	}
  
  	for (j=mmn+1; j<=n; j++) { 
	    c[j] = fracDivide(document.getElementById("c"+j).value);
	}
  
  	for (i=1; i<=m; i++) {
  		for (j=1; j<=n; j++) {
  		   
			a[i][j] =
				-fracDivide(document.getElementById("a"+i+","+j).value);
  		}
  	}
  
  	for (j=mmn+1; j<=n; j++) {
	if (document.getElementById("l"+(m+1)+","+j).className=="orangeval" && c[j] > 1e-10){
d_infeas_flag=true;	
    for (i=1; i<=m; i++) {
  		    if (a[i][j] > 0.00001) {
  			d_infeas_flag = false;
  			break;
  		    }
  		}}
       if (document.getElementById("u"+(m+2)+","+j).className=="purpleval" && c[j] < -1e-10){
  d_infeas_flag=true;
	for (i=1; i<=m; i++) {
  		    if (a[i][j] <-0.00001) {
  			d_infeas_flag = false;
  			break;
  		    }
  		}}

  		if (d_infeas_flag == true) {
  		    for (i=1; i<=m; i++) {
  			if ((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i])) {
  			    d_infeas_flag = false;
  			    break;
  			}
  		    }
  		}
  		if (d_infeas_flag == true) break;
  	    }
  	
  
  	if (d_infeas_flag == true) {
  		// reset();
  		meg.play();
  	} else {
  		bark.play();
	
  	}
  }
  
  function ck_p_infeas()
  {
  	var i, j;
  	var p_infeas_flag=false;
  
  	for (i=1; i<=m; i++) {
	    vb[i] = fracDivide(document.getElementById("vb"+i).value);
	}
  
  	for (j=mmn+1; j<=n; j++) { 
	    c[j] = fracDivide(document.getElementById("c"+j).value);
	}
  
  	for (i=1; i<=m; i++) {
  		for (j=1; j<=n; j++) {
  		   
			a[i][j] =
				-fracDivide(document.getElementById("a"+i+","+j).value);
  		    
  		}
  	}
  
  	for (i=1; i<=m; i++) {
  	    if ((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i])) {
  		p_infeas_flag = true;
  		/*for (j=mmn+1; j<=n; j++) {
  		    if (a[i][j] >  0.00001) {
  			p_infeas_flag = false;
  			break;
  		    }
  		}*/
  		if (p_infeas_flag == true) break;
  	    }
  	}
  
  	if (p_infeas_flag == true) {
  		// reset();
  		meg.play();
  	} else {
  		bark.play();
		
  	}
  }

  function makePlot() {
        var eps;
        if ( (n==2 || (n==3 && method == "Primal w/ x0" )) && ctx != null) {
	{
           plotwid = 400;
	   ctx.fillStyle = "rgb(255,255,255)";
	   ctx.fillRect(0,0,plotwid,plotwid);

           for (i=1; i<=m; i++) {

	      eps = 1e-4*(Math.random()-0.5);

	      rr = (m-i+0.5)*(m-i+0.5);
	      gg = m*m/2.-(m/2.-i+0.5)*(m/2.-i+0.5);
	      bb = (i-0.5)*(i-0.5);
	      rgb = rr+gg+bb;
	      rr0 = Math.floor(255. * rr/rgb);
	      gg0 = Math.floor(255. * gg/rgb);
	      bb0 = Math.floor(255. * bb/rgb);
	      rr = Math.floor(255. * Math.sqrt(rr/rgb));
	      gg = Math.floor(255. * Math.sqrt(gg/rgb));
	      bb = Math.floor(255. * Math.sqrt(bb/rgb));
	      ctx.strokeStyle = 'rgba('+rr+','+gg+','+bb+','+0.8/(m+2)+')';
	      ctx.fillStyle   = 'rgba('+rr+','+gg+','+bb+','+0.8/(m+2)+')';
	      ctx.beginPath();
	      xx =  -20; yy = -(b[i]+a[i][1]*xx)/(a[i][2]+eps);
	      ctx.moveTo(xpx(xx),ypx(yy));
	      var veclen = Math.sqrt(a[i][1]*a[i][1]+a[i][2]*a[i][2]); 
	      xx =  20*a[i][1]/veclen;
	      yy =  20*a[i][2]/veclen;
	      ctx.lineTo(xpx(xx),ypx(yy));
	      xx =  20; yy = -(b[i]+a[i][1]*xx)/(a[i][2]+eps);
	      ctx.lineTo(xpx(xx),ypx(yy));

	      ctx.closePath();
	      ctx.fill();
      
	      ctx.strokeStyle = "black";
	      ctx.strokeStyle = 'rgb('+rr0+','+gg0+','+bb0+')';
	      ctx.beginPath();
	      if (Math.abs(a[i][2]) > 1e-4) {
	          xx = -2; yy = -(b[i]+a[i][1]*xx)/(a[i][2]+eps);
	          ctx.moveTo(xpx(xx),ypx(yy));
	          xx =  9; yy = -(b[i]+a[i][1]*xx)/(a[i][2]+eps);
	          ctx.lineTo(xpx(xx),ypx(yy));
	      } else {
	          yy = -2; xx = -(b[i]+a[i][2]*yy)/(a[i][1]+eps);
	          ctx.moveTo(xpx(xx),ypx(yy));
	          yy =  9; xx = -(b[i]+a[i][2]*yy)/(a[i][1]+eps);
	          ctx.lineTo(xpx(xx),ypx(yy));
	      }
	      ctx.stroke();
	   }

           for (i=1; i<=m; i++) {
              if (a[i][1] == 0 && a[i][2] == 0) break;
	      ctx.strokeStyle = 'rgb(0,0,0)';
	      ctx.fillStyle   = 'rgb(0,0,0)';
	      ctx.font = "18px Letter Gothic Std, sans-serif";
	      var txt = document.getElementById("w"+i).value+'=0';
	      var wid = ctx.measureText(txt).width;
	      var hit = 15;
	      var xs = [], ys = [];
	      var x2 = [], y2 = [];
	      var cnt = 0;
	      xs[0] =  -2; ys[0] = -(b[i]+a[i][1]*xs[0])/(a[i][2]+eps);
	      xs[1] =   9; ys[1] = -(b[i]+a[i][1]*xs[1])/(a[i][2]+eps);
	      ys[2] =  -2; xs[2] = -(b[i]+a[i][2]*ys[2])/(a[i][1]+eps);
	      ys[3] =   9; xs[3] = -(b[i]+a[i][2]*ys[3])/(a[i][1]+eps);
	      var minx =  1e+20;
	      var maxx = -1e+20;
	      for (var j=0; j<4; j++) {
		if (xs[j] < minx) {minx = xs[j];}
		if (xs[j] > maxx) {maxx = xs[j];}
	      }
	      for (var j=0; j<4; j++) {
		if (xs[j] != minx && xs[j] != maxx) {
			x2[cnt] = xs[j];
			y2[cnt] = ys[j];
			cnt++;
		}
	      }
	      // var p = Math.pow(2*Math.random()-1,1./3.);
	      var p = Math.random();
	      if (p < 0.5) {p = 0.1+0.6*p;} else {p = 0.9-0.6*(1-p);}
	      var q = 1-p;
	      xx = p*x2[0]+q*x2[1];
	      yy = p*y2[0]+q*y2[1];
	      ctx.save();
	      ctx.translate(xpx(xx),ypx(yy));
	      ctx.rotate(Math.atan(a[i][1]/(a[i][2]+eps)));
	      ctx.textAlign = "center";
	      ctx.fillText(txt, 0, 0);
	      ctx.restore();
	      // ctx.fillText(txt, xpx(xx)-wid/2,     ypx(yy)+hit/3);
	   }

	   txt = document.getElementById("x0,"+1).value+'=0';
	   wid = ctx.measureText(txt).width;
	   yy = 5.2 + Math.random()-0.5;
	   xx = 0;
	   ctx.save();
	   ctx.translate(xpx(xx),ypx(yy));
	   ctx.rotate(-Math.PI/2);
	   ctx.textAlign = "center";
	   ctx.fillText(txt, 0, 0);
	   ctx.restore();
	   // ctx.fillText(txt, xpx(xx)-wid/2,     ypx(yy)+hit/3);

	   txt = document.getElementById("x0,"+2).value+'=0';
	   wid = ctx.measureText(txt).width;
	   xx = 5.4 + Math.random()-0.5;
	   yy = 0;
	   ctx.save();
	   ctx.translate(xpx(xx),ypx(yy));
	   ctx.textAlign = "center";
	   ctx.fillText(txt, 0, 0);
	   ctx.restore();
	   // ctx.fillText(txt, xpx(xx)-wid/2,     ypx(yy)+hit/3);

	   rr = 10;
	   gg = 10;
	   bb = 10;
	   // Draw grid
	   ctx.strokeStyle = 'rgba('+rr+','+gg+','+bb+','+0.1+')';
	   for (i=-2; i<=9; i++) {
	     ctx.beginPath();
	     ctx.moveTo(xpx( -2.), ypx(i));
	     ctx.lineTo(xpx(  9.), ypx(i));
	     ctx.stroke();
	     ctx.beginPath();
	     ctx.moveTo(xpx(  i), ypx( -2.));
	     ctx.lineTo(xpx(  i), ypx(  9.));
	     ctx.stroke();
	   }
	   ctx.strokeStyle = 'rgba('+rr+','+gg+','+bb+','+0.8/(m+2)+')';
	   ctx.fillStyle   = 'rgba('+rr+','+gg+','+bb+','+0.2/(m+2)+')';
	   ctx.beginPath();
	   ctx.moveTo(xpx( 0.),ypx(-2.));
	   ctx.lineTo(xpx( 9.),ypx(-2.));
	   ctx.lineTo(xpx( 9.),ypx( 9.));
	   ctx.lineTo(xpx( 0.),ypx( 9.));
	   ctx.closePath();
	   ctx.fill();
	   ctx.strokeStyle = 'rgb('+rr+','+gg+','+bb+')';
	   ctx.beginPath();
	   ctx.moveTo(xpx( 0.), ypx(-2.));
	   ctx.lineTo(xpx( 0.), ypx( 9.));
	   ctx.stroke();

	   ctx.strokeStyle = 'rgba('+rr+','+gg+','+bb+','+0.8/(m+2)+')';
	   ctx.fillStyle   = 'rgba('+rr+','+gg+','+bb+','+0.2/(m+2)+')';
	   ctx.beginPath();
	   ctx.moveTo(xpx(-2.),ypx( 0.));
	   ctx.lineTo(xpx(-2.),ypx( 9.));
	   ctx.lineTo(xpx( 9.),ypx( 9.));
	   ctx.lineTo(xpx( 9.),ypx( 0.));
	   ctx.closePath();
	   ctx.fill();
	   ctx.strokeStyle = 'rgb('+rr+','+gg+','+bb+')';
	   ctx.fillStyle   = 'rgb('+rr+','+gg+','+bb+')';
	   ctx.beginPath();
	   ctx.moveTo(xpx( -2.), ypx(0.));
	   ctx.lineTo(xpx(  9.), ypx(0.));
	   ctx.stroke();

	   ctx.font = "12px Letter Gothic Std, sans-serif";
	   ctx.fillText("-2", xpx(-2.0 ), ypx(-0.3 ));
	   ctx.fillText( "9", xpx( 8.8 ), ypx(-0.3 ));
	   ctx.fillText("-2", xpx(-0.42), ypx(-2.0 ));
	   ctx.fillText( "0", xpx(-0.3 ), ypx(-0.3 ));
	   ctx.fillText( "9", xpx(-0.3 ), ypx( 8.7 ));
	  }

	  xx = 0; yy = 0;
	  for (i=1; i<=m; i++) {
	      if (basics[i] == 1) xx=vb[i];
	      if (basics[i] == 2) yy=vb[i];
	  }
	  ctx.fillStyle = "red";
	  fillArc(xpx(xx)-2, ypx(yy)-2, 4, 0, 360);
        }
  }
  
  
  function toGrid() {
	var element;
	var nnv = "      ";
    	var nnv1= "      ";
        var wid;
        var tmp = "";
        var eps = 1e-4;
        var tmp1="";
        var tmp2="";
        var tmp3="";
	makePlot();

         tmp = ""+myformat(obj);
        wid = Math.max(3,tmp.length);
        maxden = den;
        for (i=1; i<=m; i++) {
            tmp = ""+myformat(b[i]);
            wid = Math.max(wid, tmp.length);
            maxden = Math.max(maxden, den);
        }
	 for (i=1; i<=m; i++) {
            tmp = ""+myformat(lb[i]);
            wid = Math.max(wid, tmp.length);
            maxden = Math.max(maxden, den);
        }
         for (i=1; i<=m; i++) {
            tmp = ""+myformat(ub[i]);
            wid = Math.max(wid, tmp.length);
            maxden = Math.max(maxden, den);
        }
         for (i=1; i<=m; i++) {
            tmp = ""+myformat(vb[i]);
            wid = Math.max(wid, tmp.length);
            maxden = Math.max(maxden, den);
        }
         for (i=1; i<=n; i++) {
            tmp = ""+myformat(l[i]);
            wid = Math.max(wid, tmp.length);
            maxden = Math.max(maxden, den);
        }
          for (i=1; i<=n; i++) {
            tmp = ""+myformat(u[i]);
            wid = Math.max(wid, tmp.length);
            maxden = Math.max(maxden, den);
        }

	for (j=1; j<=n; j++) {
            tmp = ""+myformat(c[j]);
            wid = Math.max(3,tmp.length);
            maxden = Math.max(maxden, den);
            for (i=1; i<=m; i++) {
                tmp = ""+myformat(-a[i][j]);
                wid = Math.max(wid, tmp.length);
                maxden = Math.max(maxden, den);
            }
        
        }
        tmp="subject to:   "+maxden+" ".length;
            document.getElementById("md"+0).setAttribute("size", tmp);
    for(i=1;i<=m+2;i++){
            document.getElementById("mb"+i).setAttribute("size", tmp);}
   
                
   
	for (j=1; j<=n; j++) {
	    element = document.getElementById("c"+j);
	    element2 = document.getElementById("u"+(m+2)+","+j);
            element1 = document.getElementById("l"+(m+1)+","+j);

	    element.value = myformat2(c[j]);
         element2.value =myformat2( u[j]);
          element1.value = myformat2(l[j]);
          
          
	    if (Math.abs(c[j]) < 1e-10) { 
                  if (vis == "Dimmed")    { 
                          element.className = "zeroval"; 
                          document.getElementById("x0,"+j).className = "zerovar"; 
                          document.getElementById("plus"+j).className = "graysign"; 
                  } else 
                  if (vis == "Invisible") { 
                          element.className = "whiteval"; 
                          document.getElementById("x0,"+j).className = "whitevar"; 
                          document.getElementById("plus"+j).className = "whitesign"; } else 
                  if (vis == "Visible")   { 
                          element.className = "val";  
                          document.getElementById("x0,"+j).className = "var"; 
                          if (document.getElementById("plus"+j) != null)
                              document.getElementById("plus"+j).className = "sign"; }
            } else { 
                  element.className = "val"; 
                  document.getElementById("x0,"+j).className = "var"; 
                  if (document.getElementById("plus"+j) != null)
                      document.getElementById("plus"+j).className = "sign"; 
            }
                
             if ((method != "Klee-Minty" && method != "Lexicographic") || j>m) {
             
 if( (element2.className=="purpleval" &&c[j]<-1e-10)||(element1.className=="orangeval" &&c[j]>1e-10))
          { element.className="pinkval"; 
                                   document.getElementById("x0,"+j).className = "var"; }
           else{
	                          if (vis == "Dimmed") {
                                 element.className = "zeroval"; } else
                                if (vis == "Invisible") {
                                 element.className = "whiteval"; } else
                                if (vis == "Visible") {
                                 element.className = "val"; } 
                               else
	                       { element.className = "val"; }
		}
	     nnv1 += l[j] + " \u2264" +  document.getElementById("x0,"+j).value +"\u2264 " +u[j];
	   if(j<n){nnv1 +=";  ";}
	    
	}
}

for (i=1;i<=n;i++) {
		element = document.getElementById("l"+(m+1)+","+i);
               
if( element.className=="orangeval" )
          {  document.getElementById("u"+(m+2)+","+i).className="val"}
}

for (i=1;i<=n;i++) {
		
		 element= document.getElementById("u"+(m+2)+","+i); 
if(  element.className=="purpleval" )
          { document.getElementById("l"+(m+1)+","+i).className="val";}
                        
		}


for (i=1;i<=n;i++) {
		
		element = document.getElementById("l"+(m+1)+","+i);
		element1= document.getElementById("u"+(m+2)+","+i); 
if(  (element.value== Infinity) )
          { element.className="val";} 
if( (element1.value== Infinity) )
{ element1.className="val"}
if(u[i]<=l[i]){tmp=u[i];u[i]=l[i];l[i]=tmp;}
                        
		}

for(i=1;i<=m;i++){vb[i]=vbval(i);if(ub[i]<=lb[i]){tmp=ub[i];ub[i]=lb[i];lb[i]=tmp;}}

for (i=1; i<=m+2; i++) {
            element = document.getElementById("mb"+i); 
            if (fmt == "Integer" && maxden != 1) { 
                    element.value = "            "+maxden; 
            } else { 
                    element.value = "            "; 
            }}
              element = document.getElementById("md0"); 
        if (fmt == "Integer" && maxden != 1) { 
                element.value = "maximize:   "+maxden; 
        } else { 
                element.value = "maximize:    "; 
        }
           element = document.getElementById("mb1"); 
        if (fmt == "Integer" && maxden != 1) { 
                element.value = "subject to:   "+maxden; 
        } else { 
                element.value = "subject to:    "; 
        }
          element = document.getElementById("mb"+(m+1)); 
        if (fmt == "Integer" && maxden != 1) { 
                element.value = "lowerbound:   "+maxden; 
        } else { 
                element.value = "lowerbound:    "; 
        }
          element = document.getElementById("mb"+(m+2)); 
        if (fmt == "Integer" && maxden != 1) { 
                element.value = "upperbound:   "+maxden; 
        } else { 
                element.value = "upperbound:    "; 
        }

	for (i=1; i<=m; i++) {
	  if (method != "Klee-Minty") {
           
            element = document.getElementById("vb"+i);  
           
            var element1 = document.getElementById("lb"+i);  
           
            var  element2 = document.getElementById("ub"+i);  

		element.value = myformat2(vb[i]);
 element1.value = myformat2(lb[i]);
  element2.value = myformat2(ub[i]);
          
	    if ((lb[i] > vb[i]) || (ub[i] < vb[i])) { element.className = "pinkval"; } else
        if (ub[i]>=vb[i] && vb[i]>=lb[i] ) { 
                                if (vis == "Dimmed") {
                                 element.className = "zeroval"; } else
                                if (vis == "Invisible") {
                                 element.className = "whiteval"; } else
                                if (vis == "Visible") {
                                 element.className = "val"; } 
                               } else
	                       { element.className = "val"; }
	  }
        
		nnv += document.getElementById("lb"+i).value + " \u2264" +  document.getElementById("w"+i).value +" \u2264" +document.getElementById("ub"+i).value;
	  if(i<m){nnv+=";  ";}
	}
    for (i=1; i<=m; i++) {
		element = document.getElementById("b"+i);
		element.value = myformat2(b[i]);
	        if (Math.abs(b[i]) < 1e-10) { 
                  if (vis == "Dimmed")    { element.className = "zeroval"; } else
                  if (vis == "Invisible") { element.className = "whiteval"; } else
                  if (vis == "Visible")   { element.className = "val"; } 
                } else { 
                                            element.className = "val"; }}
                
     /*   element = document.getElementById("md1"); 
        if (fmt == "Integer" && maxden != 1) { 
                element.value = "subject to:   "+maxden; 
        } else { 
                element.value = "subject to:   "; 
        }*/

	for (i=1; i<=m; i++) {
	    for (j=1; j<=n; j++) {
		element = document.getElementById("a"+i+","+j);
		element.value = myformat2(-a[i][j]);
	        if (Math.abs(a[i][j]) < 1e-10) { 
                  if (vis == "Dimmed")    { element.className = "zeroval"; } else
                  if (vis == "Invisible") { element.className = "whiteval"; } else
                  if (vis == "Visible")   { element.className = "val"; } 
                } else { 
                                            element.className = "val"; 
                }
	        element = document.getElementById("x"+i+","+j);
                if (Math.abs(a[i][j]) < 1e-10) { 
                  if (vis == "Dimmed")    { element.className = "zerobutvar"; element.disabled = true; } else
                  if (vis == "Invisible") { element.className = "graybutvar"; element.disabled = true; } else
                  if (vis == "Visible")   { element.className = "butvar";  element.disabled = false;}
                } else {
                                            element.className = "butvar";  element.disabled = false; 
                }
	        element = document.getElementById("minus"+i+","+j);
                if (!(method == "Klee-Minty" && j==1)) 
                if (Math.abs(a[i][j]) < 1e-10) { 
                  if (vis == "Dimmed")    { element.className = "graysign"; } else
                  if (vis == "Invisible") { element.className = "whitesign"; } else
                  if (vis == "Visible")   { element.className = "sign"; }
                } else {
                                            element.className = "sign"; 
                }
                
	    }
	}



        console.log("hello bob");
	
	  /*  element = document.getElementById("zstar"); 
            element.value = myformat2(obj);
            console.log("obj = "+obj);
           // if (obj == 0) { element.className = "whiteval"; } else 
                          { element.className = "val"; }
            element = document.getElementById("plus"+1);
           // if (obj == 0) { element.className = "whitesign"; } *?
	
	}*/

	if (listlen == 0) {
	    element = document.getElementById("basicvars");
	    element.value = nnv;
	    element.style.color = "gray";
	}
    if (listlen == 0) {
	    element = document.getElementById("nonbasicvars");
	    element.value = nnv1;
	    element.style.color = "gray";
	}

  }
 
  function fillArc(x,y,r,theta0, theta1)
  {
	ctx.beginPath();
	ctx.arc(x+r/2,y+r/2,r/2,theta0*Math.PI/180,theta1*Math.PI/180);
	ctx.fill();
  }

  var log_of_10 = Math.log(10);
  function log10(x)
  {
        return 0.0+Math.log(x)/log_of_10;
  }

  function myformat(x) {
	var ratio=contFrac(width,precision,x)+"";
        var digits = Math.ceil(log10(10*maxden));
        if (digits == 1) digits = 0;
        if (maxden == 2) digits = 1;
        if (maxden == 5) digits = 1;
        if (maxden == 10) digits = 1;
	/*if (fmt == "Decimal") {
	    return sprintf("%0."+digits+"f", x);
	    // return -sprintf("%0."+digits+"f", -x);
	    // return -sprintf("%10.6f", -x);
	} else {*/
	    return ratio;
	//}
  }

  function myformat2(x) {
        if (fmt == "Integer") {
            return myformat(maxden*x);
        } else {
            return myformat(x);
        }
  }

  var num, den, maxden;

  function contFrac(width, precision, t) {
        var bj=0, Aj=0, Aj1, Aj2, Bj=1, Bj1, Bj2;
        var pos;
        var tj, maxDen = Math.pow(10, precision);
        var numstr0, numstr;
        var width4 = width+9;
    
        if (t >= 0) { pos = true;   tj =  t; } 
        else        { pos = false;  tj = -t; }
    
        bj  = Math.floor(tj+1.0e-12);
        Aj  = bj; Aj1 = 1;
        Bj  = 1;  Bj1 = 0;
        num = Aj;
        den = Bj;
        if (!pos) {num = -num;}
        numstr0 = "";
        numstr = fracString(num, den, width4, precision);
        if (tj == bj){ return numstr; }
        tj = 1/(tj-bj);
        while (Math.abs(t - num/(1.0*den)) > 1.0e-12 ) {
	    Aj2 = Aj1; Aj1 = Aj;
	    Bj2 = Bj1; Bj1 = Bj;
	    
	    bj = Math.floor(tj+1.0e-12);
	    Aj = bj*Aj1 + Aj2;
	    Bj = bj*Bj1 + Bj2;
    
	    num = Aj;
	    den = Bj;
    
	    if (!pos) {num = -num;}
	    numstr0 = numstr;
	    numstr = fracString(num, den, width4, precision);
	    if (numstr.length >= width4 || Bj >= maxDen) {
	        return numstr0;
	    }
	    tj = 1/(tj-bj);
        }

        return numstr;
  } 

  function fracString(num, den, width, precision)
  {
        var numstr = "" + num;
        var len = numstr.length;

        for (var k=len; k<width-precision-1; k++) {
	    numstr = " " + numstr;
        }
    
        if (den == 1) {
	    return(numstr+"");
        } else {
	    return(numstr+"/"+den);
        }
  }

  function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
	    end = new Date().getTime();
	}
  }

// Random number generator 
// Because Math.random() does not support seeds in javascript

  var seed = 0;
  var randa = 1103515245;
  var randm = 4294967296;
  var randc = 12345;

  function myseed(v) {
	v = 1*v.valueOf(); 
	if (v == 0) {
	    seed = Math.floor(randm*Math.random());
	} else {
	    seed = v;
	}
  }

  function myrand() {
	if (seed == 0) {
	    seed = Math.floor(randm*Math.random());
	}
	seed = (randa*seed+randc)%randm;
	return (1.0*seed/(randm-1));
  }

  function fracDivide(s) {
	var i;
	var x;
	var num;
	var den;

	i = s.indexOf("/");
	if (i != -1) {
		num = s.substring(0,i);
		den = s.substring(i+1);
		// alert("s = "+s+", num = "+num+", den = "+den);
		x = num/den;
	} else {
		// alert("s = "+s);
		x = 1.0*s;
	}

	return x;
  }

  // From https://blog.mastykarz.nl/measuring-the-length-of-a-string-in-pixels-using-javascript/

  String.prototype.visualLength = function() 
  {
          var ruler =  document.getElementById("ruler");
          ruler.innerHTML = this;
          return ruler.offsetWidth;
  }
 /* function $(id)
  {
    return document.getElementById(id);
  }*/
