
<!-- <!DOCTYPE HTML SYSTEM "html.dtd"> -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"
"http://www.w3.org/TR/REC-html40/loose.dtd">
<HTML>
<HEAD>
<TITLE>Bounded Simplex Pivot Tool</TITLE>
<!--<LINK REL="SHORTCUT ICON" HREF="/myshield.png" TYPE="image/png">-->
<LINK REL="stylesheet" HREF="boundedsimplex.css" TYPE="text/css" MEDIA="screen">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<meta charset="utf-8"/>
<script src="fraction.js" type="text/javascript"></script>
<script src="functions.js" type="text/javascript"></script>

</HEAD>

<BODY onload="start()" bgcolor="white">
<span id="ruler"></span>
<font size="+0">
<center>
<H2>Simple Pivot Tool for Bounded Problem</H2>
Go general: &nbsp; &nbsp;
Constraints = <input size="3" value="3" class="input" id="m" onchange="setm(this.value)">,
Variables   = <input size="3" value="4" class="input" id="n" onchange="setn(this.value)">.
	    &nbsp; &nbsp;
	    Labels:
	    <select class="input" id="method" onchange="setMethod( this.value )"> 
	      <option value="Primal">Primal</option> 
	      <!--
	      <option value="Primal w/ x0">Primal w/ x0</option> 
	      -->
	    <!-- <option value="Lexicographic">Lexicographic</option> 
	      <option value="Klee-Minty">Klee-Minty</option> 
	      <option value="Dual">Dual</option> -->
	    </select>,
	    &nbsp; &nbsp;
	    <button class="input" onclick="start()">Clear</button>
	    <p>
Seed = <input size="5" value="0" class="input" id="seed" onchange="myseed(this.value)">
	    &nbsp;
<button class="input" onclick="genrand()">Generate Random Problem</button>
	    <p>
Or: &nbsp; &nbsp;
Select an Exercise from <i>Linear Programming: Foundations and Extensions</i>:
	    <select class="input" onchange="setExercise( this.value )"> 
	      <option value="--">--</option> 
		<option value="HW_2_1">Homework 2_1</option> 
		<option value="HW_2_2">Homework 2_2</option> 
		<option value="HW_3_1">Homework 3_1</option> 
		<option value="HW_3_2">Homework 3_2</option> 
	    	<option value="Ex_2_1">Exercise 2.1</option> 
	      <option value="Ex_2_2">Exercise 2.2</option> 
	      <option value="Ex_2_8">Exercise 2.8</option> 
	      <option value="Ex_3_2">Exercise 3.2</option> 
	      <option value="Ex_4_1">Exercise 4.1</option> 
	      <option value="Ex_4_2">Exercise 4.2</option> 
	      <option value="Ex_4_3">Exercise 4.3</option> 
	      <option value="Ex_4_4">Exercise 4.4</option> 
	      <option value="Ex_5_6">Exercise 5.6</option> 
	      <option value="Lec_2_1">Lecture 2.1</option> 
	      <option value="Lec_2_2">Lecture 2.2</option> 
	      <option value="Lec_4_1">Lecture 4.1</option> 
	      <option value="Lec_4_2">Lecture 4.2</option> 
	      <option value="Lec_4_3">Lecture 4.3</option> 
	      <option value="Lec_4_4">Lecture 4.4</option> 
	      <option value="Lec_5_1">Lecture 5.1</option> 
	      <option value="Lec_5_2">Lecture 5.2</option> 
	      <option value="Eq_2_2">Equation 2.2</option> 

	    </select>
	    <p>
<div class="row">
<div class="column"> <canvas id="blah" width="0" height="0"></canvas> </div>
<div class="column">
<p>
<button class="input" onclick="Hint()">Hint</button>
	    &nbsp; &nbsp;
<button class="input" onclick="Undo()">Undo</button>
	<!--
	    &nbsp; &nbsp;
<button onclick="reset()">Reset</button>,
	-->
<p>
	<!--
	    &nbsp; &nbsp;
	-->
	    Number format: 
	    <select class="input" onchange="setFormat( this.value )"> 
	      <option value="Fraction">Fraction</option> 
	      <option value="Decimal">Decimal</option> 
	      <option value="Integer">Integer</option> 
	    </select>

	    &nbsp; &nbsp;
	    Zero Visibility: 
	    <select class="input" onchange="setVisibility( this.value )"> 
	      <option value="Visible">Visible</option> 
	      <option value="Dimmed">Dimmed</option> 
	      <option value="Invisible">Invisible</option> 
	    </select>
	    <p>
<FORM>
	    <h3> Current Dictionary </h3>
	    <p>

<div id="rowStuff0"></div>
<p>
<div id="rowStuff1"></div>
<div id="rowStuff2"></div>
<div id="rowStuff3"></div>
<div id="rowStuff4"></div>
<div id="rowStuff5"></div>
<div id="rowStuff6"></div>
<div id="rowStuff7"></div>
<div id="rowStuff8"></div>
<div id="rowStuff9"></div>
<div id="rowStuff10"></div>
<div id="rowStuff11"></div>
<div id="rowStuff12"></div>
<div id="rowStuff13"></div>
<div id="rowStuff14"></div>
<div id="rowStuff15"></div>
<div id="rowStuff16"></div>
<div id="rowStuff17"></div>
<div id="rowStuff18"></div>
<div id="rowStuff19"></div>
<div id="rowStuff20"></div>
<div id="rowStuff21"></div>
<div id="rowStuff22"></div>
<div id="rowStuff23"></div>
<div id="rowStuff24"></div>
<div id="rowStuff25"></div>
</FORM>
<p>
<button class="input" onclick="ck_opt()">Optimal</button> &nbsp; &nbsp;
<button class="input" onclick="ck_p_infeas()">Infeasible</button> &nbsp; &nbsp;
<button class="input" onclick="ck_p_unbdd()">Unbounded</button> 
<!--</div>
<div class="column"> <p> <canvas id="plot2d" width="0" height="0"></canvas> <p> </div>
</div>-->


</BODY>
</HTML>


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
  var nonbasics=[];
  var obj;
  var vb0;
  var element;
  var method;
  var xlabel = [], wlabel = [], llabel=[], ulabel=[],lblabel=[],ublabel=[];
  method = "Primal";

  var ctx = null;

  var rowlist = [];
  var collist = [];
  var listlen;
  var ublist=[];
  var lblist=[];
  var lowlist=[];

  var fmt="Fraction";
  var vis="Visible";
  var width=0;
  var precision=8;

  var xlo, xhi, ylo, yhi, plotwid;

  var meg, bark, dothat, finiteB, pivotF;
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
	
        /* if (type == "text" && clas != "sign" && clas != "var" && clas != "equals") {
             element.setAttribute("onmouseover", "makeitshow(id)");
             element.setAttribute("onmouseleave", "ck_edits(); toGrid()");
         }*/
  
	  var rowElement = document.getElementById("rowStuff"+row);
  
	  //Append the element in page (in span).
	  rowElement.appendChild(element);
  
  }
 function makeitshow(id) {
          var element;
          element = document.getElementById(id);
		if(element.value==0){
                  element.className = "showval"; }else{}
  
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
	  if (n==2 ) {
	     plotcanvas = document.getElementById("plot2d");
	     ctx = plotcanvas.getContext('2d');
	     ctx.canvas.height = "400";
	     ctx.canvas.width = "400";
	     // ctx.font = "12px Helvetica, sans-serif";
	     ctx.font = "12px Letter Gothic Std, sans-serif";
	     // ctx.font = "12px Arial, sans-serif";
	  } else {
	     plotcanvas = document.getElementById("plot2d");
	     ctx = plotcanvas.getContext('2d');
	     ctx.canvas.height = "0";
	     ctx.canvas.width = "0";
	  }
	  
          console.log("setn");
          toGrid();
  }
  function setBarker(v) { 
          console.log("setting bark to "+v.valueOf());
          bark = new Audio(v.valueOf()); 
  }

  function setMethod(v) { method = v.valueOf(); start();}

  function setFormat(v) { 
          var ctr_right;
          fmt = v.valueOf(); 
          if (fmt == "Fraction") {ctr_right = "center";} else {ctr_right = "right";}
          if (document.getElementById("zstar") != null) 
              document.getElementById("zstar").style.textAlign = ctr_right; 
	  document.getElementById("vb"+0).style.textAlign = ctr_right; 
          for (i=1; i<=m; i++) {
	      document.getElementById("b"+i).style.textAlign = ctr_right;
              document.getElementById("vb"+i).style.textAlign = ctr_right;
              for (j=1; j<=n; j++) {
		  document.getElementById("a"+i+","+j).style.textAlign = ctr_right;
              }
          }
          for (j=1; j<=n; j++) {
              document.getElementById("l"+(m+1)+","+j).style.textAlign = ctr_right;
	  }
          for (j=1; j<=n; j++) {
              document.getElementById("u"+(m+2)+","+j).style.textAlign = ctr_right;
	  }
          for (j=1; j<=n; j++) { 
	      document.getElementById("c"+j).style.textAlign = ctr_right; 
	  }
          for (j=1; j<=m; j++) { 
	      document.getElementById("ub"+j).style.textAlign = ctr_right; 
	  }
          for (j=1; j<=m; j++) { 
	      document.getElementById("lb"+j).style.textAlign = ctr_right; 
	  }
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
	         b[i] = 0; vb[i]=0; lb[i]=0;ub[i]=0;
		}   
	  } else if (v.valueOf() == "Ex_2_1") {
	      m = 2; document.getElementById("m").value = m;
	      n = 4; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = 6; c[2] = 8; c[3] = 5; c[4] = 9;
	      a[1][1] = 2; a[1][2] = 1; a[1][3] = 1; a[1][4] = 3; b[1] = 5;
	      a[2][1] = 1; a[2][2] = 3; a[2][3] = 1; a[2][4] = 2; b[2] = 3;
		l[1]=0; l[2]=0; l[3]=0; l[4]=0; lb[1]=0; lb[2]=0;
		u[1]=Infinity; u[2]=Infinity; u[3]=Infinity; u[4]=Infinity;
		ub[1]=Infinity; ub[2]=Infinity;
		toGrid();
	  } else
	  if (v.valueOf() == "HW_3_2") {
	      m = 2; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
		start();
	      type = "minimize:"; document.getElementById("md0").value = type;
	      type = "minvar"; document.getElementById("md0").className = type;
	      method = "Primal"; document.getElementById("method").value = method;
	      
	      c[1] = -2; c[2] = -4; c[3] = -1; 
	      a[1][1] = 2; a[1][2] = 1; a[1][3] = 1; b[1] = 10;
	      a[2][1] = 2; a[2][2] = 1; a[2][3] = -1; b[2] = 4;
		l[1]=0; l[2]=0; l[3]=1; lb[1]=0; lb[2]=0; 
		u[1]=4; u[2]=6; u[3]=4; ub[1]=Infinity;
		ub[2]=Infinity; 
		for(j=1;j<=3;j++){
			document.getElementById("l"+(m+1)+","+j).className = "orangeval";
	      	}
		toGrid();
	  } else
	  if (v.valueOf() == "HW_2_1") {
	      m = 2; document.getElementById("m").value = m;
	      n = 4; document.getElementById("n").value = n;
		start();
	      type = "minimize:"; document.getElementById("md0").value = type;
	       document.getElementById("md0").className = "minvar";
	      method = "Primal"; document.getElementById("method").value = method;
		
	      c[1] = -2; c[2] = -3; c[3] = 1; c[4] = 12; 
	      a[1][1] = -2; a[1][2] = -9; a[1][3] = 1; a[1][4] = 9; b[1] = 0;
	      a[2][1] = 1/3; a[2][2] = 1; a[2][3] = -1/3; a[1][3] = -2; b[2] = 0;
		
		for(j=1;j<=m;j++){
			lb[j]=0; ub[j]=Infinity;
	      	}
		for(j=1;j<=n;j++){
			l[j]=0; u[j]=Infinity;
	      	}
		toGrid();
	  } else
	  if (v.valueOf() == "HW_2_2") {
	      m = 3; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
		start();
	      type = "minimize:"; document.getElementById("md0").value = type;
	      type = "minvar"; document.getElementById("md0").className = type;
	      method = "Primal"; document.getElementById("method").value = method;
	      
	      c[1] = -60; c[2] = -30; c[3] = -20; 
	      a[1][1] = 8; a[1][2] = 6; a[1][3] = 1; b[1] = 10;
	      a[2][1] = 4; a[2][2] = 2; a[2][3] = 1.5; b[2] = 4;
	      a[3][1] = 2; a[3][2] = 1.5; a[3][3] = 0.5; b[3] = 4;
		for(i=1;i<=m;i++){lb[i]=0; ub[i]=Infinity;}
		for(i=1;i<=n;i++){l[i]=0; }u[1]=Infinity; u[3]=Infinity;u[2]=5;
		for(j=1;j<=3;j++){
			document.getElementById("l"+(m+1)+","+j).className = "orangeval";
	      	}
		toGrid();
	  }  else
	  if (v.valueOf() == "HW_3_1") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
		 start();
	      type = "minimize:"; document.getElementById("md0").value = type;
	      type = "minvar"; document.getElementById("md0").className = type;
	      method = "Primal"; document.getElementById("method").value = method;
	     
	      c[1] = 2; c[2] = 3; c[3] = 4; 
	      a[1][1] = 1; a[1][2] = 2; a[1][3] = 1; b[1] = -3;
	      a[2][1] = 2; a[2][2] = -1; a[2][3] = 3; b[2] = -4;
		for(j=1;j<=2;j++){
			l[j]=0; u[j]=Infinity;
	      	}
		for(j=1;j<=3;j++){
			lb[j]=0; ub[j]=Infinity;
	      	}
		toGrid();
	  } else
	  if (v.valueOf() == "Ex_2_8") {
	      m = 8; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] =  3; c[2] =  2; 
	      a[1][1] =  1; a[1][2] = -2; b[1] =  1;
	      a[2][1] =  1; a[2][2] = -1; b[2] =  2;
	      a[3][1] =  2; a[3][2] = -1; b[3] =  6;
	      a[4][1] =  1; a[4][2] =  0; b[4] =  5;
	      a[5][1] =  2; a[5][2] =  1; b[5] = 16;
	      a[6][1] =  1; a[6][2] =  1; b[6] = 12;
	      a[7][1] =  1; a[7][2] =  2; b[7] = 21;
	      a[8][1] =  0; a[8][2] =  1; b[8] = 10;	
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=8;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Ex_3_2") {
	      m = 3; document.getElementById("m").value = m;
	      n = 4; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = 10; c[2] = -57; c[3] = -9; c[4] = -24;
	      a[1][1] = 1; a[2][2] = 1; a[3][3] = 1;
	      a[1][1] = 0.5; a[1][2] = -5.5; a[1][3] = -2.5; a[1][4] = 9; b[1] = 0;
	      a[2][1] = 0.5; a[2][2] = -1.5; a[2][3] = -0.5; a[2][4] = 1; b[2] = 0;
	      a[3][1] = 1;   a[3][2] =  0;   a[3][3] =  0;   a[3][4] = 0; b[3] = 1;
		 for(i=1;i<=4;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Ex_4_1") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = 4; c[2] = 5; 
	      a[1][1] = 2; a[1][2] = 2; b[1] = 9;
	      a[2][1] = 1; a[2][2] = 0; b[2] = 4;
	      a[3][1] = 0; a[3][2] = 1; b[3] = 3;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Ex_4_2") {
	      m = 1; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = 2; c[2] = 1; 
	      a[1][1] = 3; a[1][2] = 1; b[1] = 3;

		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=1;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Ex_4_3") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = 3; c[2] = 5; 
	      a[1][1] = 1; a[1][2] = 2; b[1] = 5;
	      a[2][1] = 1; a[2][2] = 0; b[2] = 3;
	      a[3][1] = 0; a[3][2] = 1; b[3] = 2;

		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Ex_4_4") {
	      m = 3; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Klee-Minty"; document.getElementById("method").value = method;
	      start();
	      genrand();
	  } else
	  if (v.valueOf() == "Ex_5_5") {
	      m = 3; document.getElementById("m").value = m;
	      n = 4; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] =  2; c[2] =  8; c[3] = -1; c[4] = -2; 
	      a[1][1] =  2; a[1][2] =  3; a[1][3] =  0; a[1][4] =  6; b[1] = 6;
	      a[2][1] = -2; a[2][2] =  4; a[2][3] =  3; a[2][4] =  0; b[2] = 1.5;
	      a[3][1] =  3; a[3][2] =  2; a[3][3] = -2; a[3][4] = -4; b[3] = 4;
		
		 for(i=1;i<=4;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Ex_5_6") {
	      m = 6; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = -1; c[2] = -2; 
	      a[1][1] = -2; a[1][2] =  7; b[1] =  6;
	      a[2][1] = -3; a[2][2] =  1; b[2] = -1;
	      a[3][1] =  9; a[3][2] = -4; b[3] =  6;
	      a[4][1] =  1; a[4][2] = -1; b[4] =  1;
	      a[5][1] =  7; a[5][2] = -3; b[5] =  6;
	      a[6][1] = -5; a[6][2] =  2; b[6] = -3;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=6;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Ex_6_1") {
	      m = 2; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = -6; c[2] = 32; c[3] = -9; 
	      a[1][1] = -2; a[1][2] = 10; a[1][3] = -3; b[1] = -6;
	      a[2][1] =  1; a[2][2] = -7; a[2][3] =  2; b[2] =  4;
              wlabel[1] = "x"+sub[4];
              wlabel[2] = "x"+sub[5];
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=2;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "sensitivity") {
	      m = 3; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] =  5; c[2] =  4; c[3] =  3; 
	      a[1][1] =  2; a[1][2] =  3; a[1][3] =  1; b[1] =  5;
	      a[2][1] =  4; a[2][2] =  1; a[2][3] =  2; b[2] = 11;
	      a[3][1] =  3; a[3][2] =  4; a[3][3] =  2; b[3] =  8;
              wlabel[1] = "x"+sub[4];
              wlabel[2] = "x"+sub[5];
              wlabel[3] = "x"+sub[6];
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Lec_2_1") {
	      m = 4; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = 14; c[2] = 19; 
	      a[1][1] =  4; a[1][2] = -8; b[1] = 16;
	      a[2][1] =  8; a[2][2] =  5; b[2] = 40;
	      a[3][1] =  6; a[3][2] =  8; b[3] = 38;
	      a[4][1] = -7; a[4][2] =  7; b[4] = 21;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=4;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Lec_2_2") {
	      m = 4; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] =  4; c[2] =  5; 
	      a[1][1] =  2; a[1][2] = -10; b[1] = 12;
	      a[2][1] = -4; a[2][2] =   6; b[2] = 30;
	      a[3][1] =  3; a[3][2] =  -6; b[3] = 12;
	      a[4][1] = -8; a[4][2] =   6; b[4] = 18;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=4;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Lec_4_1") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] =  2; c[2] =  3; 
	      a[1][1] =  1; a[1][2] =   2; b[1] = 8;
	      a[2][1] =  1; a[2][2] =  -1; b[2] = 4;
	      a[3][1] = -1; a[3][2] =   1; b[3] = 4;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Lec_4_2") {
	      m = 2; document.getElementById("m").value = m;
	      n = 4; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] =  1; c[2] =  -2; c[3] = 0; c[4] = -2;
	      a[1][1] =  0.5; a[1][2] = -3.5; a[1][3] = -2;   a[1][4] =   4; b[1] = 0;
	      a[2][1] =  0.5; a[2][2] = -1;   a[2][3] = -0.5; a[2][4] = 0.5; b[2] = 0;
		 for(i=1;i<=4;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=2;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Lec_4_3") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Lexicographic"; document.getElementById("method").value = method;
	      start();
	      c[4] =  2; c[5] =  3; 
              a[1][1] = 1; a[2][2] = 1; a[3][3] = 1;
	      a[1][4] = -1; a[1][5] =   1; 
	      a[2][4] = -3; a[2][5] =   1; 
	      a[3][4] =  4; a[3][5] =  -1; 
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Lec_4_4") {
	      m = 2; document.getElementById("m").value = m;
	      n = 4; document.getElementById("n").value = n;
	      method = "Lexicographic"; document.getElementById("method").value = method;
	      start();
	      c[3] =  1; c[4] =  -2; c[5] = 0; c[6] = -2;
              a[1][1] = 1; a[2][2] = 1;
	      a[2][3] =  0.5; a[2][4] = -3.5; a[2][5] = -2;   a[2][6] =   4; 
	      a[1][3] =  0.5; a[1][4] = -1;   a[1][5] = -0.5; a[1][6] = 0.5; 
		 for(i=1;i<=4;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=2;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "cycle") {
	      m = 3; document.getElementById("m").value = m;
	      n = 4; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] =  1; c[2] =  -2; c[3] = 0; c[4] = -2;
	      a[1][1] =  0.5; a[1][2] = -3.5; a[1][3] = -2;   a[1][4] =   4; b[1] = 0;
	      a[2][1] =  0.5; a[2][2] = -1;   a[2][3] = -0.5; a[2][4] = 0.5; b[2] = 0;
	      a[3][1] =    1; a[3][2] =  0;   a[3][3] =  0  ; a[3][4] = 0  ; b[3] = 1;
		 for(i=1;i<=4;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Lec_5_1") {
	      m = 3; document.getElementById("m").value = m;
	      n = 4; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = -2; c[2] = 1; c[3] = 1; c[4] = 4;
	      a[1][1] = 0;   a[1][2] =  1;   a[1][3] =  1;   a[1][4] =   2; 
	      a[2][1] = 0;   a[2][2] =  0;   a[2][3] =  2;   a[2][4] =   2; 
	      a[3][1] = 6;   a[3][2] =  2;   a[3][3] = -2;   a[3][4] =   5; 
              b[1] = 4; b[2] = 3; b[3] = 5;
		 for(i=1;i<=4;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();

	  } else
	  if (v.valueOf() == "Lec_5_2") {
	      m = 4; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Dual"; document.getElementById("method").value = method;
	      start();
	      b[1] = 2; b[2] = -1; b[3] = -1; b[4] = -4;
	      a[1][1] =  0;   a[1][2] =  0;   a[1][3] = -6;
	      a[2][1] = -1;   a[2][2] =  0;   a[2][3] = -2;
	      a[3][1] = -1;   a[3][2] = -2;   a[3][3] =  2;
	      a[4][1] = -2;   a[4][2] = -2;   a[4][3] = -5;
              c[1] = -4; c[2] = -3; c[3] = -5;
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=4;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Eq_2_2") {
	      m = 3; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      b[1] = 5; b[2] = 11; b[3] = 8;
	      a[1][1] =  2;   a[1][2] =  3;   a[1][3] =  1;
	      a[2][1] =  4;   a[2][2] =  1;   a[2][3] =  2;
	      a[3][1] =  3;   a[3][2] =  4;   a[3][3] =  2;
              c[1] =  5; c[2] =  4; c[3] =  3;
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Eq_452") {
	      m = 2; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      b[1] = 2; b[2] = 2; 
	      a[1][1] =  1;   a[1][2] =  0;   a[1][3] =  2;
	      a[2][1] =  0;   a[2][2] =  1;   a[2][3] =  2;
              c[1] =  1; c[2] =  2; c[3] =  3;
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=2;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Eq_452_1") {
	      m = 2; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
              obj=3;
	      b[1] = 1; b[2] = 0; 
	      a[1][1] =  0.5;   a[1][2] = 0;   a[1][3] =  0.5;
	      a[2][1] = -1;     a[2][2] = 1;   a[2][3] = -1;
              c[1] = -0.5; c[2] =  2; c[3] = -1.5;
              xlabel[3] = "w"+sub[1];
              wlabel[1] = "x"+sub[3];
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=2;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Phase_1") {
	      m = 3; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      b[1] = -1; b[2] = -2; b[3] = 1;
	      a[1][1] = -1;   a[1][2] =  1;   a[1][3] = -1;
	      a[2][1] = -1;   a[2][2] = -2;   a[2][3] = -1;
	      a[3][1] =  0;   a[3][2] =  1;   a[3][3] = -1;
              c[1] =  0; c[2] =  0; c[3] =  -1;
              xlabel[3] = "x"+sub[0]; 
              for (i=1; i<=3; i++) {
                    document.getElementById("x"+i+","+3).value = xlabel[3]; 
              }
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Phase_2") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      b[1] = 1./3.; b[2] = 4./3.; b[3] = 2./3.;
	      a[1][1] =  1./3.;   a[1][2] = -1./3.;
	      a[2][1] = -2./3.;   a[2][2] = -1./3.;
	      a[3][1] = -1./3.;   a[3][2] =  1./3.;
              c[1] =  -1; c[2] =  -1; 
              obj = -3;
	      document.getElementById("zstar").value = myformat(obj);
              wlabel[1] = "x"+sub[2];
              wlabel[2] = "x"+sub[1];
              wlabel[3] = "w"+sub[3];
              xlabel[1] = "w"+sub[1]; 
              xlabel[2] = "w"+sub[2]; 
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Unbounded") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      b[1] = 5; b[2] = 7; b[3] = 0;
	      a[1][1] =  -2; a[1][2] =  3;
	      a[2][1] =   0; a[2][2] =  4;
	      a[3][1] =   0; a[3][2] = -1;
              c[1] =   1; c[2] =  -1; 
              obj = 5;
	      document.getElementById("zstar").value = myformat(obj);
              wlabel[1] = "x"+sub[2];
              wlabel[2] = "x"+sub[4];
              wlabel[3] = "x"+sub[5];
              xlabel[1] = "x"+sub[3]; 
              xlabel[2] = "x"+sub[1]; 
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "Fig_2_1") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      b[1] = 12; b[2] = 8; b[3] = 10;
	      a[1][1] = -1;   a[1][2] =  3;   
	      a[2][1] =  1;   a[2][2] =  1;   
	      a[3][1] =  2;   a[3][2] = -1;   
              c[1] =  3; c[2] =  2; 
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "degen") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      b[1] = 0; b[2] = 0; b[3] = 1;
	      a[1][1] = -9;   a[1][2] = -4;   
	      a[2][1] =  4;   a[2][2] =  2;   
	      a[3][1] =  0;   a[3][2] =  1;   
              c[1] =  6; c[2] =  4; 
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  }  else
	  if (v.valueOf() == "primal1") {
	      m = 2; document.getElementById("m").value = m;
	      n = 3; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      b[1] = 1; b[2] = 3; 
	      a[1][1] =  1; a[1][2] =  4; a[1][3] = 0;
	      a[2][1] =  3; a[2][2] = -1; a[2][3] = 1;
              c[1] = 4; c[2] = 1;  c[3] = 3;
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=2;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "dual1") {
	      n = 2; document.getElementById("n").value = n;
	      m = 3; document.getElementById("m").value = m;
	      method = "Dual"; document.getElementById("method").value = method;
	      start();
	      c[1] = -1; c[2] = -3; 
	      a[1][1] = -1; a[2][1] = -4; a[3][1] =  0;
	      a[1][2] = -3; a[2][2] =  1; a[3][2] = -1;
              b[1] = -4; b[2] = -1;  b[3] = -3;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "primal2") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = -1; c[2] = -1; 
	      a[1][1] = -2; a[2][1] = -2; a[3][1] = -1;
	      a[1][2] = -1; a[2][2] =  4; a[3][2] =  3;
              b[1] =  4; b[2] = -8;  b[3] = -7;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "dual2") {
	      n = 3; document.getElementById("n").value = n;
	      m = 2; document.getElementById("m").value = m;
	      method = "Dual"; document.getElementById("method").value = method;
	      start();
	      b[1] = 1; b[2] = 1; 
	      a[1][1] =  2; a[1][2] =  2; a[1][3] =  1;
	      a[2][1] =  1; a[2][2] = -4; a[2][3] = -3;
              c[1] = -4; c[2] = 8;  c[3] = 7;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  } else
	  if (v.valueOf() == "primal3") {
	      m = 3; document.getElementById("m").value = m;
	      n = 2; document.getElementById("n").value = n;
	      method = "Primal"; document.getElementById("method").value = method;
	      start();
	      c[1] = -1; c[2] = 4; 
	      a[1][1] = -2; a[2][1] = -2; a[3][1] = -1;
	      a[1][2] = -1; a[2][2] =  4; a[3][2] =  3;
              b[1] =  4; b[2] = -8;  b[3] = -7;
		 for(i=1;i<=2;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=3;i++){ lb[i]=0; ub[i]=Infinity;}
	  } else
	  if (v.valueOf() == "dual3") {
	      n = 3; document.getElementById("n").value = n;
	      m = 2; document.getElementById("m").value = m;
	      method = "Dual"; document.getElementById("method").value = method;
	      start();
	      b[1] = 1; b[2] = -4; 
	      a[1][1] =  2; a[1][2] =  2; a[1][3] =  1;
	      a[2][1] =  1; a[2][2] = -4; a[2][3] = -3;
              c[1] = -4; c[2] = 8;  c[3] = 7;
		 for(i=1;i<=3;i++){ l[i]=0; u[i]=Infinity;}
		 for(i=1;i<=2;i++){ lb[i]=0; ub[i]=Infinity;}
		toGrid();
	  }else
	  {}

	  listlen = 0;
	  for (var i=0; i<100; i++) rowlist[i] = -1;

	 /* for (i=1; i<=m; i++) {
	     document.getElementById("w"+i).value = wlabel[i]; // +" ";
	  }
          var newwid = 1;
	  element = document.getElementById("obj");
	  if (element != null) { newwid = Math.max(newwid, element.value.visualLength());}
	  for (i=1; i<=m; i++) {
	    var element = document.getElementById("w"+i);
	    newwid = Math.max(newwid, element.value.visualLength());
	  }
          newwid += 10;
	  var element = document.getElementById("obj");
	  if (element != null) { element.style.width = newwid+"px";}
	  for (i=1; i<=m; i++) {
	    var element = document.getElementById("w"+i);
	    element.style.width = newwid+"px";
	  }
	  for (j=1; j<=n; j++) {
	     document.getElementById("x0,"+j).value = xlabel[j]; // +" ";
	     var wid = document.getElementById("x0,"+j).value.visualLength() + 10;
             for (i=0; i<=m; i++) {
	         document.getElementById("x"+i+","+j).value = xlabel[j]; // +" ";
                 var element = document.getElementById("x"+i+","+j);
                 element.style.width = wid+"px";
             }
	  }
          for (j=1; j<=n; j++) {
	     document.getElementById("x0,"+j).value = xlabel[j]; // +" ";
	     var wid = document.getElementById("x0,"+j).value.visualLength() + 10;
             for (i=0; i<=m; i++) {
	         document.getElementById("x"+i+","+j).value = xlabel[j]; // +" ";
                 var element = document.getElementById("x"+i+","+j);
                 element.style.width = wid+"px";
             }
	  }*/
	  for (i=1; i<=m; i++) {
	     for (j=1; j<=n; j++) {
	         a[i][j] *= -1;
	     }
	  }

	  for (j=1; j<=n; j++) {nonbasics[j] = j;}
	  for (i=1; i<=m; i++) {basics[i] = n+j;}

	  if (n==2 ) {
	     plotcanvas = document.getElementById("plot2d");
	     ctx = plotcanvas.getContext('2d');
	     ctx.canvas.width = "400";
	     ctx.canvas.height = "400";
	     // ctx.font = "12px Helvetica, sans-serif";
	     ctx.font = "12px Letter Gothic Std, sans-serif";
	     // ctx.font = "12px Arial, sans-serif";
	  } else {
	     plotcanvas = document.getElementById("plot2d");
	     ctx = plotcanvas.getContext('2d');
	     ctx.canvas.height = "0";
	     ctx.canvas.width = "0";
	  }
	 
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
	//start();

	// ==================================================
	for (i=1; i<=m; i++) { a[i] = [];}
 
	var scale, shift;
	scale = (m+2)+n; shift = Math.floor(scale/2); 
    	for(j=1;j<=n;j++){
    		l[j]=-1* Math.floor(scale*myrand());
    		u[j]=Math.floor(scale*myrand());
    	}
    	if(Math.random()<.3){
		for(i=1;i<=n;i++){ 
     			element=document.getElementById("l"+(m+1)+","+i);
			element1=document.getElementById("u"+(m+2)+","+i);
      			element.className="orangeval";
			element1.className="val";
		}
	} else {
		for(i=1;i<=n;i++){ 
     			element=document.getElementById("l"+(m+1)+","+i);
			element1=document.getElementById("u"+(m+2)+","+i);
      			element.className="val";
			element1.className= "purpleval";
		}
	}
	for (i=1; i<=m; i++) {
		for (j=1; j<=n; j++) {
		    a[i][j]  = Math.floor(scale*myrand())-shift;
		    a[i][j] += Math.floor(scale*myrand())-shift;
		    a[i][j] += Math.floor(scale*myrand())-shift;
		}
	}
 
	if ( myrand() < 0.3 ) { 
		scale = (m+n); shift = Math.floor(scale/2); 
	} else { scale = (m+n)/2; shift = 0; }
	
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

     
	/*if (n==2 && method == "Primal" && myrand() < 0.8) {
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
	}*/

	// ==================================================

	for(i=1;i<=m;i++){vb[i]=vbval(i);}
	obj = 0;
	vb0=objval();

	listlen = 0;
	for (var i=0; i<100; i++) rowlist[i] = -1;
	for (var i=0; i<100; i++) ublist[i] = -1;
	for (var i=0; i<100; i++) lblist[i] = -1;
	for (var i=0; i<100; i++) lowlist[i] = -1;
	for (i=1; i<=m; i++) {
	     document.getElementById("w"+i).value = wlabel[i]; // +" ";
	}
	
	for (j=1; j<=n; j++) {
	     document.getElementById("x0,"+j).value = xlabel[j]; // +" ";
	    // var wid = document.getElementById("x0,"+j).value.visualLength() + 30;
             for (i=0; i<=m+2; i++) {
	         document.getElementById("x"+i+","+j).value = xlabel[j]; // +" ";
                 var element = document.getElementById("x"+i+","+j);
                // element.style.width = wid+"px";
             }
	}

	for (j=1; j<=n; j++) {nonbasics[j] = j;}
	for (i=1; i<=m; i++) {basics[i] = n+j;}

	toGrid();

  } 

  function vbval(i){
	var uz=[];var lz=[];
 	for (j=1; j<=n; j++){ 
		element=document.getElementById("l"+(m+1)+","+j);
       		var element1=document.getElementById("u"+(m+2)+","+j);
       		if(element.className=="orangeval"){ lz[j]=j;}
       		if( element1.className=="purpleval"){ uz[j]=j;}
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
 function objval(){
	var uz=[];var lz=[];
 	for (j=1; j<=n; j++){ 
		element=document.getElementById("l"+(m+1)+","+j);
       		var element1=document.getElementById("u"+(m+2)+","+j);
       		if(element.className=="orangeval"){ lz[j]=j;}
       		if( element1.className=="purpleval"){ uz[j]=j;}
        }     
	var uf=uz.filter(x=>x!=null);
	var lf=lz.filter(x=>x!=null);
	var vbj=0; var vb=0;
       	for (j of lf) {
            vbj+=c[j]*l[j];}
       	for (k of uf) {  
            vb+=c[k]*u[k];}
	return obj+vbj+vb;
  }

  function Undo() {
	var row, col, bsc, nbsc, lowl,upl;
	var click=false;
        for(i=1;i<=m;i++){
		for(j=1;j<=n;j++){
			if( document.getElementById("x"+i+","+j).className=="clickvar"){
				click=true;
				break;		
			}
		}
	}
	if(click!=true){
	if (listlen > 0) { listlen--; } else { listlen = 99; }
	row = rowlist[listlen];
	col = collist[listlen];
        lbsc= lblist[listlen];
	ubsc= ublist[listlen];
        lowl= lowlist[listlen];
	
	if (lowl!=-1) {lowgotClicked(lowl);lowlist[listlen]=-1;}
	else if (row !=-1) {
		
                if (ubsc!=-1) {
			
				document.getElementById("u"+(m+2)+","+col).className="purpleval";
				document.getElementById("l"+(m+1)+","+col).className="val";
				ublist[listlen]=-1;
		}
		else if (lbsc!= -1){
			document.getElementById("l"+(m+1)+","+col).className="orangeval";
			document.getElementById("u"+(m+2)+","+col).className="val";
			lblist[listlen]=-1;
		}

		pivot(row,col);
		rowlist[listlen]=-1;  
	}
	}

	toGrid();

	//}
	
 }

  function gotClicked(row,col) {

	if(a[row][col]!=0){
		/*for(i=1;i<=m;i++){
			if(i!=row){
				document.getElementById("w"+i+","+(n+1)).disabled=true;
				document.getElementById("w"+i+","+(n+2)).disabled=true;
			}
		}*/
		for(j=1;j<=n;j++){
			for(i=1;i<=m;i++){
				if(i!=row || j!=col){
					document.getElementById("x"+i+","+j).disabled=true;
				}
			}
		}
		
		if(lb[row]!=-Infinity){
				document.getElementById("w"+row+","+(n+1)).className="clickvar";
				document.getElementById("w"+row+","+(n+1)).disabled=false;}
		if(ub[row]!=Infinity){
				document.getElementById("w"+row+","+(n+2)).className="clickvar";
				document.getElementById("w"+row+","+(n+2)).disabled=false;}
		/*	setTimeout(function(){
        			//Max timeout 
           			//yellowtrue(row,col);
	   			document.getElementById("lb"+0).disabled=false;
    			}, 3000);
		}*/

		/*if(ub[row]==Infinity){
      			document.getElementById("ub"+0).disabled=true;
      			/*setTimeout(function(){
        			//Max timeout 
           			//yellowtrue(row,col);
	   			document.getElementById("ub"+0).disabled=false;
    			}, 3000);*/

		//}
		for(j=1;j<=n;j++){
			document.getElementById("x"+(m+2)+","+j).disabled=true;
      			/*setTimeout(function(){
        			//Max timeout 
           			//yellowtrue(row,col);
	   			document.getElementById("x"+(m+2)+","+col).disabled=false;
    			}, 3000);*/
		document.getElementById("x"+(m+1)+","+j).disabled=true;}
      			/*setTimeout(function(){
        			//Max timeout 
           			//yellowtrue(row,col);
	   			document.getElementById("x"+(m+1)+","+col).disabled=false;
    			}, 3000);*/
		//dothat.play();
		if(document.getElementById("x"+row+","+col).className!="clickvar"){
		document.getElementById("x"+row+","+col).className="clickvar";}
		else { //document.getElementById("w"+row+","+(n+1)).className="butvar";
			//document.getElementById("w"+row+","+(n+2)).className="butvar";
			//document.getElementById("w"+row+","+(n+1)).disabled=true;
			//document.getElementById("w"+row+","+(n+2)).disabled=true;
			toGrid();
		}

    		/*setTimeout(function(){
        		//Max timeout 
           		//yellowtrue(row,col);
	  		document.getElementById("x"+row+","+col).className="butvar";
    		}, 300);*/
		
		
		/*var click=false;
		for(i=1;i<=m;i++){
			if((document.getElementById("w"+i+","+(n+1)).className=="clickvar")
			||(document.getElementById("w"+i+","+(n+2)).className=="clickvar")){
				click=true;
				break;
			}
		}
		while(click==false){
			
	  			document.getElementById("x"+row+","+col).className="clickvar";}*/
		
			/*setTimeout(function(){
        			//Max timeout 
           			//movestrue(row,col);
	  			document.getElementById("x"+row+","+col).className="butvar";
    			}, 3000);*/
		/*if(click==true){
			
	  			document.getElementById("x"+row+","+col).className="butvar";
	  			document.getElementById("w"+row+","+(n+1)).className="butvar";	
	  			document.getElementById("w"+row+","+(n+2)).className="butvar";
           			yellowtrue(row,col);
		}*/
  	}
	//toGrid();
  }

  function lbgotChoice(row){
	
	
	
	var click=false;
        var col;
		for(j=1;j<=n;j++){
			if( document.getElementById("x"+row+","+j).className=="clickvar"){
				click=true;
				col=j;
				break;		
			}
		}
	rowlist[listlen] = row;
	collist[listlen] = col;
	if(document.getElementById("l"+(m+1)+","+col).className=="orangeval"){
		lblist[listlen] = col;
	}
	else if(document.getElementById("u"+(m+2)+","+col).className=="purpleval"){
		ublist[listlen]= col;
	}
	if (listlen < 99) { listlen++; } else {listlen=0;}
	/*while(click==false){
		document.getElementById("x"+row+","+col).className="clickvar";

    		setTimeout(function(){
        		//Max timeout 
           		yellowtrue(row,col);
	  		document.getElementById("x"+row+","+col).className="butvar";
    		}, 300);
		
	}*/
 	/*if(n==2){
	rowlist[listlen] = row;
	collist[listlen] = collist[listlen-1];
	if(document.getElementById("l"+(m+1)+","+col).className=="orangeval"){
		lblist[listlen] = col;
	}
	else if(document.getElementById("u"+(m+2)+","+col).className=="purpleval"){
		ublist[listlen]= col;
	}
	if (listlen < 99) { listlen++; } else {listlen=0;}
	}*/

	/*if(click==true ){
		lbgotClicked(row,col);
		document.getElementById("w"+row+","+(m+3)).disabled=true;
		
		document.getElementById("w"+row+","+(m+3)).className="butvar";
		document.getElementById("w"+row+","+(m+4)).disabled=true;
		
		document.getElementById("w"+row+","+(m+4)).className="butvar";
		document.getElementById("x"+row+","+col).className="butvar";
	} /*else if(document.getElementById("w"+row+","+(m+3)).className=="clickvar" && click==true){
		ubgotClicked(row,col);
		document.getElementById("w"+row+","+(m+4)).className=="butvar";
		document.getElementById("x"+row+","+col).className=="butvar"*/
	/*} else if(document.getElementById("x"+(m+1)+","+col).className=="clickvar"){
			//lowgotClicked(row,col);
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;
			if(listlen<99){listlen+=1;} else {listlen=0;}*/
	/*} else if(document.getElementById("x"+(m+2)+","+col).className=="clickvar"){
			lowgotClicked(row,col);
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;*/
	/*} else {
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;
			lblist[listlen] = -1;
			ublist[listlen] = -1;
			return;
	}*/
	//}
	//toGrid();
	//}
	if(click==true ){
		lbgotClicked(row,col);
		document.getElementById("w"+row+","+(n+1)).disabled=true;
		
		document.getElementById("w"+row+","+(n+1)).className="butvar";
		document.getElementById("w"+row+","+(n+2)).disabled=true;
		
		document.getElementById("w"+row+","+(n+2)).className="butvar";
		document.getElementById("x"+row+","+col).className="butvar";
	} /*else if(document.getElementById("w"+row+","+(n+1)).className=="clickvar" && click==true){
		ubgotClicked(row,col);
		document.getElementById("w"+row+","+(n+2)).className=="butvar";
		document.getElementById("x"+row+","+col).className=="butvar"*/
	/*} else if(document.getElementById("x"+(m+1)+","+col).className=="clickvar"){
			//lowgotClicked(row,col);
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;
			if(listlen<99){listlen+=1;} else {listlen=0;}*/
	/*} else if(document.getElementById("x"+(m+2)+","+col).className=="clickvar"){
			lowgotClicked(row,col);
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;*/
	/*} else {
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;
			lblist[listlen] = -1;
			ublist[listlen] = -1;
			return;
	}*/
	//}
	toGrid();
  }
function ubgotChoice(row){
	
	var click=false;
        var col;
		for(j=1;j<=n;j++){
			if( document.getElementById("x"+row+","+j).className=="clickvar"){
				click=true;
				col=j;
				break;		
			}
		}
	rowlist[listlen] = row;
	collist[listlen] = col;
	if(document.getElementById("l"+(m+1)+","+col).className=="orangeval"){
		lblist[listlen] = col;
	}
	else if(document.getElementById("u"+(m+2)+","+col).className=="purpleval"){
		ublist[listlen]= col;
	}
	if (listlen < 99) { listlen++; } else {listlen=0;}
	/*if(n==2){
		if(click==true ){
		ubgotClicked(row,col);
		document.getElementById("w"+row+","+(m+4)).disabled=true;
		document.getElementById("w"+row+","+(m+4)).className="butvar";
		document.getElementById("w"+row+","+(m+3)).disabled=true;
		
		document.getElementById("w"+row+","+(m+3)).className="butvar";
		document.getElementById("x"+row+","+col).className="butvar"
	} 
	toGrid();
	}*/
	if(click==true ){
		ubgotClicked(row,col);
		document.getElementById("w"+row+","+(n+2)).disabled=true;
		document.getElementById("w"+row+","+(n+2)).className="butvar";
		document.getElementById("w"+row+","+(n+1)).disabled=true;
		
		document.getElementById("w"+row+","+(n+1)).className="butvar";
		document.getElementById("x"+row+","+col).className="butvar"
	} /*else if(document.getElementById("w"+row+","+(n+1)).className=="clickvar" && click==true){
		ubgotClicked(row,col);
		document.getElementById("w"+row+","+(n+2)).disabled=true;
		document.getElementById("x"+row+","+col).className="butvar"*/
	/*} else if(document.getElementById("x"+(m+1)+","+col).className=="clickvar"){
			//lowgotClicked(row,col);
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;
			if(listlen<99){listlen+=1;} else {listlen=0;}*/
	/*} else if(document.getElementById("x"+(m+2)+","+col).className=="clickvar"){
			lowgotClicked(row,col);
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;*/
	/*} else {
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;
			lblist[listlen] = -1;
			ublist[listlen] = -1;
			return;
	}*/
	//}
	toGrid();
  }
 /* function yellowtrue(row,col){

	if(document.getElementById("w"+row+","+(n+1)).className=="clickvar"){
		lbgotClicked(row,col);
	} else if(document.getElementById("w"+row+","+(n+1)).className=="clickvar"){
		ubgotClicked(row,col);*/
	/*} else if(document.getElementById("x"+(m+1)+","+col).className=="clickvar"){
			//lowgotClicked(row,col);
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;
			if(listlen<99){listlen+=1;} else {listlen=0;}*/
	/*} else if(document.getElementById("x"+(m+2)+","+col).className=="clickvar"){
			lowgotClicked(row,col);
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;*/
	/*} else {
			if(listlen>0){listlen-=1;} else {listlen=99;}
			rowlist[listlen] = -1;
			lblist[listlen] = -1;
			ublist[listlen] = -1;
			return;
	}*/
	//}
 // }
/* function movestrue(row,col){

	if(document.getElementById("l"+(m+1)+","+col).className=="clickvar"){
		lowgotClicked(row,col);
		if(listlen>0){listlen-=1;} else {listlen=99;}
		rowlist[listlen] = -1;
	}else if(document.getElementById("u"+(m+2)+","+col).className=="clickvar"){
		upgotClicked(row,col);
		if(listlen>0){listlen-=1;} else {listlen=99;}
		rowlist[listlen] = -1;
	} else {
		if(listlen>0){listlen-=1;} else {listlen=99;}
		rowlist[listlen] = -1;
		lblist[listlen] = -1;
		ublist[listlen] = -1;
		return;
	}
  }*/

 /*function lbgotChoice (row)  {
	document.getElementById("w"+row+","+(n+1)).className="clickvar";*/

    	/*setTimeout(function(){
        	//Max timeout  
        	document.getElementById("w"+row+","+(n+1)).className="butvar";
    	}, 2000);*/
 /* }

 function ubgotChoice(row) {
	document.getElementById("w"+row+","+(n+2)).className="clickvar";*/
    
	/*setTimeout(function(){
        	//Max timeout 
        	document.getElementById("w"+row+","+(n+2)).className="butvar";
    	}, 2000);*/

 //}
 
function pbgotClicked() {
	element= document.getElementById("md0");
	
	if(element.className=="maxvar"){
		element.value= "minimize:";
		element.className= "minvar";
	}else {
		element.value= "maximize:";
		element.className= "maxvar";
	}
		for(j=1;j<=n;j++){ c[j]=-c[j];}
	toGrid();
 }

 function lbgotClicked(row,col) {
	//pivot(row,col);
	if(ub[row]==Infinity || ub[row]==-Infinity){
		pivot(row,col);
		document.getElementById("u"+(m+2)+","+col).className="zeroval";
		document.getElementById("x"+(m+2)+","+col).disabled= true;
		document.getElementById("l"+(m+1)+","+col).className="orangeval";
	} else {
		pivot(row,col);
		document.getElementById("l"+(m+1)+","+col).className="orangeval";
		document.getElementById("u"+(m+2)+","+col).className="val";
	} 
	toGrid();
 }

 function ubgotClicked(row,col) {
	if(lb[row]==-Infinity || lb[row]==Infinity){
		pivot(row,col);
		document.getElementById("l"+(m+1)+","+col).className="zeroval";
		document.getElementById("x"+(m+1)+","+col).disabled= true;
		document.getElementById("u"+(m+2)+","+col).className="purpleval";
	} else {
		pivot(row,col);
		document.getElementById("u"+(m+2)+","+col).className="purpleval";
		document.getElementById("l"+(m+1)+","+col).className="val";
	} 
	toGrid();
 }

function lowgotChoice(col) {
	
	var click = false;

	for(i=1;i<=m;i++){
		if(document.getElementById("x"+i+","+col).className=="clickvar"){
			click=true;
			break;
		}
	}
	
	if(click==false){

		lowlist[listlen] = col;
	
		//document.getElementById("x"+(m+1)+","+col).className="clickvar";
		if (listlen < 99) { listlen++; } else {listlen=0;}
        	lowgotClicked(col);
		toGrid(); 
	} else {
		if(listlen>0){listlen-=1;} else {listlen=99;}
		lowlist[listlen] = col;
		if (listlen < 99) { listlen++; } else {listlen=0;}
        	lowgotClicked(col);
		toGrid(); 
	}
 }
 function lowgotClicked(col){

	if(document.getElementById("x"+(m+1)+","+col).disabled==false){
		if(document.getElementById("l"+(m+1)+","+col).className=="orangeval"){
			document.getElementById("l"+(m+1)+","+col).className="val";
			document.getElementById("u"+(m+2)+","+col).className="purpleval";
		} else { 
			document.getElementById("l"+(m+1)+","+col).className="orangeval";
			document.getElementById("u"+(m+2)+","+col).className="val";
		}
		
	} 
	
	toGrid();
}

 function Hint() {
	var tmp, eps=1e-6;
	if (method == "Primal") {
		
		var low=[];
		for (i=1; i<=n; i++) {
                	low[i]=document.getElementById("l"+(m+1)+","+i);
		}
		var up=[];
		for (i=1; i<=n; i++) {
                	up[i]=document.getElementById("u"+(m+2)+","+i);
		}
		var colov=[];
		for (i=1; i<=m; i++) {
			element=document.getElementById("vb"+i);
                        colov[i]=window.getComputedStyle(element).backgroundColor;
		}
		if ( colov.indexOf("rgb(255, 170, 255)")!= -1){
			for (i=1; i<=m; i++) {
			
				tmp = 1e+10;
				if (vb[i]<lb[i]*eps) {
					for (j=1; j<=n; j++) {

			  			if ((a[i][j] < -eps &&  low[j].className == "orangeval" && -c[j]/a[i][j] < tmp) || 
						(a[i][j] > eps &&  up[j].className == "purpleval" && -c[j]/a[i][j] < tmp)) {
			    				tmp = -c[j]/a[i][j];
		  				}
					}
				
	      			} else if (vb[i]>ub[i]*eps) {
						for (j=1; j<=n; j++) {
		  					if ((a[i][j] > eps &&  low[j].className == "orangeval" && -c[j]/a[i][j] < tmp) || 
							(a[i][j] < -eps &&  up[j].className == "purpleval" && -c[j]/a[i][j] < tmp)) {
		    						tmp = -c[j]/a[i][j];
		  					}
						}
				} else if(lb[i]==-Infinity && ub[i]==Infinity){
						for (j=1; j<=n; j++) {

		  					if ((c[j] > eps &&  low[j].className == "orangeval" && (u[j]-l[j]) < tmp) || 
							(c[j] < -eps &&  up[j].className == "purpleval" && (u[j]-l[j]) < tmp)) {
		    						tmp = u[j]-l[j];
		  					}
						}
				}
	      			if(lb[i]==-Infinity && ub[i]==Infinity){
						for (j=1; j<=n; j++) {
		  					if ((c[j] > eps &&  low[j].className == "orangeval" && (u[j]-l[j]) < tmp+eps) || 
							(c[j] < -eps &&  up[j].className == "purpleval" && (u[j]-l[j]) < tmp+eps)) {
		    						document.getElementById("x"+(m+1)+","+j).className = "greenvar";
		  					}
						}	
				} else if (vb[i]<lb[i]*eps) {
						for (j=1; j<=n; j++) {
		  					if ((a[i][j] < -eps &&  low[j].className == "orangeval" && -c[j]/a[i][j] < tmp+eps) || 
							(a[i][j] > eps &&  up[j].className == "purpleval" && -c[j]/a[i][j] < tmp+eps)) {
		    						document.getElementById("x"+i+","+j).className = "greenvar";
		  					}
						}
				} else if (vb[i]>ub[i]*eps) {
						for (j=1; j<=n; j++) {
		  					if ((a[i][j] > eps &&  low[j].className == "orangeval" && -c[j]/a[i][j] < tmp+eps) || 
							(a[i][j] < -eps &&  up[j].className == "purpleval" && -c[j]/a[i][j] < tmp+eps)) {
		    						document.getElementById("x"+i+","+j).className = "greenvar";
		  					}
						}
	      			}
				setTimeout(function(){  
						for(i=1;i<=m;i++){
							for(j=1;j<=n;j++){
								if(a[i][j]!=0){
									document.getElementById("x"+i+","+j).className= "butvar";
								}
							}	
						}
					},300);
					/*setTimeout(function(){  
						for(j=1;j<=n;j++){
							if(l[j]!=-Infinity || u[j]!=Infinity)
								document.getElementById("x"+(m+1)+","+j).className= "butvar";
								document.getElementById("x"+(m+2)+","+j).className= "butvar";
							}
						},300);*/
			
	    	}
	} else {
		for (j=1; j<=n; j++) {
				if( up[j].className=="purpleval" && c[j]< -eps){ 
					tmp=u[j]-l[j];
					for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
		  					if (a[i][j] > eps && (lb[i]-vb[i])/(-a[i][j]) < tmp) {
		    						tmp = (lb[i]-vb[i])/(-a[i][j]);
		  					}
							else if (a[i][j] <- eps && (ub[i]-vb[i])/(-a[i][j]) < tmp) {
		    						tmp = (ub[i]-vb[i])/(-a[i][j]);
		  					}
						//}
					}
					for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
		  					if (a[i][j] > eps && (lb[i]-vb[i])/(-a[i][j]) < tmp) {
		    						tmp = (lb[i]-vb[i])/(-a[i][j]);
		  					}
						//}
					}
					if(l[j]!=-Infinity && (u[j]-l[j])< tmp+eps){
		    					document.getElementById("x"+(m+1)+","+j).className = "greenvar";
					}
					for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
							
		  					if (a[i][j] > eps && (lb[i]-vb[i])/(-a[i][j]) < tmp+eps) {
		    						document.getElementById("x"+i+","+j).className = "greenvar";
							}
							if (a[i][j] <- eps && (ub[i]-vb[i])/(-a[i][j]) < tmp+eps) {
		    						document.getElementById("x"+i+","+j).className = "greenvar";
							}
						//}
					}
					
	      			}
				if(low[j].className=="orangeval" && c[j]>eps){ 
					tmp=u[j]-l[j];
					for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
		  					if (a[i][j] < -eps && (lb[i]-vb[i])/a[i][j] < tmp) {
		    						tmp = (lb[i]-vb[i])/a[i][j];
		  					}
							else if (a[i][j] > eps && (ub[i]-vb[i])/a[i][j] < tmp) {
		    						tmp = (ub[i]-vb[i])/a[i][j];
		  					}
						//}
					}
					for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
		  					if (a[i][j] < -eps && (lb[i]-vb[i])/a[i][j] < tmp) {
		    						tmp = (lb[i]-vb[i])/a[i][j];
		  					}
						//}
					}
					for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
							if(u[j]!=Infinity && (u[j]-l[j])< tmp+eps){
		    						document.getElementById("x"+(m+2)+","+j).className = "greenvar";
							}
		  					if (a[i][j] < -eps && (lb[i]-vb[i])/a[i][j] < tmp+eps) {
		    						document.getElementById("x"+i+","+j).className = "greenvar";
							}
							if (a[i][j] > eps && (ub[i]-vb[i])/a[i][j] < tmp+eps) {
		    						document.getElementById("x"+i+","+j).className = "greenvar";
							}
						//}
					}
					
 
	      			}
				setTimeout(function(){  
						for(i=1;i<=m;i++){
							for(j=1;j<=n;j++){
								if(a[i][j]!=0){
									document.getElementById("x"+i+","+j).className= "butvar";
								}
							}	
						}
					},300);
					setTimeout(function(){  
						for(j=1;j<=n;j++){
							if(l[j]!=-Infinity || u[j]!=Infinity)
								document.getElementById("x"+(m+1)+","+j).className= "butvar";
								document.getElementById("x"+(m+2)+","+j).className= "butvar";
							}
						},300);
 
				/*else
				 if(up[j].className=="purpleval" && c[j]<-eps){
					tmp=u[j]-l[j];
					for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
		  					if (a[i][j] > eps && (lb[i]-vb[i])/a[i][j] < tmp) {
		    						tmp = (lb[i]-vb[i])/a[i][j];
		  					}
							else if (a[i][j] <- eps && (ub[i]-vb[i])/a[i][j] < tmp) {
		    						tmp = (ub[i]-vb[i])/a[i][j];
		  					}
						//}
					}*/
					/*for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
		  					if (a[i][j] < -eps && (lb[i]-vb[i])/a[i][j] < tmp) {
		    						tmp = (lb[i]-vb[i])/a[i][j];
		  					}
						//}
					}*/
					/*for (i=1; i<=m; i++) {
						//if(lb[i]!=-Infinity || ub[i]!=Infinity){
							if(l[j]!=-Infinity && (u[j]-l[j])< tmp+eps){
		    						document.getElementById("x"+(m+1)+","+j).className = "greenvar";
							}
		  					else if (a[i][j] > eps && (lb[i]-vb[i])/a[i][j] < tmp+eps) {
		    						document.getElementById("x"+i+","+j).className = "greenvar";
							}
							else if (a[i][j] <- eps && (ub[i]-vb[i])/a[i][j] < tmp+eps) {
		    						document.getElementById("x"+i+","+j).className = "greenvar";
							}
						//}
					}
					setTimeout(function(){  
						for(i=1;i<=m;i++){
							for(j=1;j<=n;j++){
								if(a[i][j]!=0){
									document.getElementById("x"+i+","+j).className= "butvar";
								}
							}	
						}
					},300);
					setTimeout(function(){  
						for(j=1;j<=n;j++){
							if(l[j]!=-Infinity || u[j]!=Infinity)
								document.getElementById("x"+(m+1)+","+j).className= "butvar";
							}
						},300);
 
	   			}*/
			}
		}
	}	
    
	
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
	
	if (element != null) { 
		newwid = Math.max(newwid, element.value.visualLength());
	}
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
	if(n==2){
	for (i=0; i<=m0+6; i++) {
	    removeElements(document.querySelectorAll("#rowStuff"+i+" input"));
	    removeElements(document.querySelectorAll("#rowStuff"+i+" br"));
	}
	} else {for (i=0; i<=m0+4; i++) {
	    removeElements(document.querySelectorAll("#rowStuff"+i+" input"));
	    removeElements(document.querySelectorAll("#rowStuff"+i+" br"));
	}}
	
    
	m0 = m;
	 //fmt = "Decimal";
	seed = 0;
        document.getElementById("seed").value = seed;

	listlen = 0;
	for (var i=0; i<100; i++) rowlist[i] = -1;
	for (var i=0; i<100; i++) ublist[i] = -1;
	for (var i=0; i<100; i++) lblist[i] = -1;
	for (var i=0; i<100; i++) lowlist[i] = -1;

	if (method == "Primal") {
            for (j=1; j<=n; j++) { xlabel[j] = "x"+sub[j]; }
            for (i=1; i<=m; i++) { wlabel[i] = "w"+sub[i]; }
	}
	
	zlabel = "\u03B6";
	
     	add("button","maximize:",1 ,0,""        ,"maxvar" ,"md0"  ); 
	document.getElementById("md0").style.textAlign = "left";
      
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
	}
	add("text"," = "    ,1 ,0,"readonly","equals","e1"  );

        add("text"  ,"0"           ,1 ,0,"readonly","val" ,"vb"+0 );
	
     if(n==2){

	for (i=1; i<=m; i++) {
     
      		add("text","",1,i,"readonly","fixvar","mb"+i);
            	document.getElementById("mb"+i).style.textAlign = "left";
     		
		add("text",wlabel[i],1 ,i,"","val"   ,"w"+i);   
	    	element = document.getElementById("w"+i);
        	element.style.textAlign = "center";
		element.setAttribute("onchange","updateRowLabel("+i+")");
         
		add("text"," = "    ,3 ,i,"readonly","equals","eb"+i   );
         
	     	add("text","0"       ,5 ,i,""        ,"val"   ,"b"+i);  
	    
		for (j=1; j<=n; j++) {
		     
                    add("text"  ,"  -"        ,3,i,"readonly","sign" ,"minus"+i+","+j   );
                    
		    tmp = document.getElementById("minus"+i+","+j);
                    tmp.style.backgroundColor = "#F8F8F8";
	            
		    add("text"  ,"0"           ,5 ,i,""        ,"val"   ,"a"+i+","+j);
                    
		    tmp = document.getElementById("a"+i+","+j);
                    tmp.style.backgroundColor = "#F8F8F8";
		    
		    add("button",xlabel[j]+" ","",i,""        ,"butvar"   ,"x"+i+","+j);

		} 
	
		add("text"," = "    ,1 ,i,"readonly","equals","e1"+i   );
	
         	add("text"  ,"0"           ,1 ,i,""    ,"val"   ,"vb"+i);
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
	add("text","",1,m+1,"readonly","fixvar","mb"+(m+1));
        document.getElementById("mb"+(m+1)).style.textAlign = "left";
	element=document.getElementById("mb"+(m+1));
        element.setAttribute("onmouseover", "ck_edits; toGrid()");
        element.setAttribute("onmouseleave", "ck_edits; toGrid()");
        
        add("text","  "     ,1,m+1,"readonly","sign","e01"      );
  
	add("text","  "     ,3,m+1,"readonly","sign","e02"      );
	
	add("text","  "     ,5,m+1,"readonly","sign","e03"      );

     	for (j=1; j<=n; j++) {
		
                    add("text"  ,"  "        ,3,m+1,"readonly","sign" ,"minus"+(m+1)+","+j   );
                  
	            add("text"  ,"0"           ,5,m+1,""        ,"val"   ,"l"+(m+1)+","+j);
                    
		    add("button",xlabel[j]+"",3,m+1,"","butvar"   ,"x"+(m+1)+","+j);
		
	} 

	add("text","  "    ,1 ,m+1,"readonly","sign","e1"+(m+1)  );
         
	add("text"  ,""           ,1 ,m+1,"readonly","sign" ,"vb"+(m+1) );
	document.getElementById("vb"+(m+1)).style.textAlign = "right";


	add("text","",1,m+2,"readonly","fixvar","mb"+(m+2));
        document.getElementById("mb"+(m+2)).style.textAlign = "left";
	element=document.getElementById("mb"+(m+2));
        element.setAttribute("onmouseover", "ck_edits; toGrid()");
        element.setAttribute("onmouseleave", "ck_edits; toGrid()");
          
	add("text","  "     ,1,m+2,"readonly","sign","e04"      );
  
	add("text","  "     ,3,m+2,"readonly","sign","e05"      );
	
	add("text","  "     ,5,m+2,"readonly","sign","e06"      );
	
	for(i=1;i<=6;i++){
	element=document.getElementById("e0"+i);
        element.setAttribute("onmouseover", "ck_edits; toGrid()");
        element.setAttribute("onmouseleave", "ck_edits; toGrid()");}

     	for (j=1; j<=n; j++) {
                    
              add("text"  ,"  "        ,3,m+2,"readonly","sign" ,"minus"+(m+2)+","+j   );
                  
	      add("text"  ,"0"           ,5,m+2,""        ,"val"   ,"u"+(m+2)+","+j);
                  
	      add("button",xlabel[j]+"","",m+2,"","butvar"   ,"x"+(m+2)+","+j);

		
	} 
	
	add("text","  "    ,1 ,m+2,"readonly","sign","e1"+(m+2)  );
         
	add("text"  ,""           ,1 ,m+2,"readonly","sign" ,"vb"+(m+2) );

	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+1));
	rowElement.appendChild(element);
	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+2));
	rowElement.appendChild(element);
	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+2));
	rowElement.appendChild(element);

	
	add("text","Graph",1,m+3,"readonly","fixvar","lbl"+1);
        document.getElementById("lbl"+1).style.textAlign = "center";

	element=document.getElementById("lbl"+1);
        element.setAttribute("onmouseover", "toGrid()");
        element.setAttribute("onmouseleave", "toGrid()");
        add("text","Basics LB",1,m+3,"readonly","fixvar","lb"+0);
        document.getElementById("lb"+0).style.textAlign = "center";
   
     	for (j=1; j<=m; j++) {
		    
	            //add("text"  ,""           ,1,m+3,"readonly"        ,"sign"   ,"eb1"+j);
                  
	            add("text"  ,"0"           ,5,m+3,""        ,"val"   ,"lb"+j);
                    
		    add("button",wlabel[j],3,m+3,"readonly","var"   ,"w"+j+","+(n+1));
		
	} 

	add("text","  "    ,1 ,m+3,"readonly","sign","e1"+(m+3)  );
         
	add("text"  ,""           ,1 ,m+3,"readonly","sign" ,"vb"+(m+3) );
	
	add("text","Labels",1,m+4,"readonly","fixvar","lbl"+0);
        document.getElementById("lbl"+0).style.textAlign = "center";

	element=document.getElementById("lbl"+0);
        element.setAttribute("onmouseover", "toGrid()");
        element.setAttribute("onmouseleave", "toGrid()");

 
	add("text","Basics UB",1,m+4,"readonly","fixvar","ub"+0);
        document.getElementById("ub"+0).style.textAlign = "center";

	element=document.getElementById("ub"+0);
        element.setAttribute("onmouseover", "ck_edits; toGrid()");
        element.setAttribute("onmouseleave", "ck_edits; toGrid()");
   
     	for (j=1; j<=m; j++) {

	            //add("text"  ,""           ,1,m+4,"readonly"        ,"sign"   ,"eb"+j);
		
	            add("text"  ,"0"           ,5,m+4,""        ,"val"   ,"ub"+j);
                    
		    add("button",wlabel[j],3,m+4,"","var"   ,"w"+j+","+(n+2));
	} 

	add("text","  "    ,1 ,m+4,"readonly","sign","e1"+(m+4)  );
         
	add("text"  ,""           ,1 ,m+4,"readonly","sign" ,"vb"+(m+4) );
        
	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+3));
	rowElement.appendChild(element);
	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+3));
	rowElement.appendChild(element);
	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+4));
	rowElement.appendChild(element);

	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+4));
	rowElement.appendChild(element);
    
	add("button", "", 80, m+5, "readonly", "fixval", "basicvars");
	add("button", "", 80, m+6, "readonly", "fixval", "nonbasicvars");
	element=document.getElementById("basicvars");
        element.setAttribute("onmouseover", "ck_edits; toGrid()");
        element.setAttribute("onmouseleave", "ck_edits; toGrid()");
	element=document.getElementById("nonbasicvars");
        element.setAttribute("onmouseover", "ck_edits; toGrid()");
        element.setAttribute("onmouseleave", "ck_edits, toGrid()");
        
	for (i=1; i<=m; i++) {
	    for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+i+","+j);
	        element.setAttribute("onclick","gotClicked("+i+","+j+")");
	    }
	}


	var element = document.getElementById("md0");
	element.setAttribute("onclick","pbgotClicked()");

	for(i=1;i<=m;i++){
 		var element = document.getElementById("w"+i+","+(n+1));
		element.setAttribute("onclick","lbgotChoice("+i+")");
	}
	for(i=1;i<=m;i++){
		var element = document.getElementById("w"+i+","+(n+2));
		element.setAttribute("onclick","ubgotChoice("+i+")");
	}

	for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+(m+1)+","+j);
	        element.setAttribute("onclick","lowgotChoice("+j+")");
	}
	
 	for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+(m+2)+","+j);
	        element.setAttribute("onclick","lowgotChoice("+j+")");
	}
	/* for (i=1; i<=m; i++) {
		element = document.getElementById("b"+i);
		element.value = myformat2(b[i]);
		if (Math.abs(b[i]) < 1e-10) { 
             		if (vis == "Dimmed"){ element.className = "zeroval";
            	 element.setAttribute("onmouseover", "makeitshow(id)");
             	 element.setAttribute("onmouseleave", "ck_edits()"); } else 
	     		if (vis == "Invisible") { element.className = "whiteval"; 
            	 element.setAttribute("onmouseover", "makeitshow(id)");
             	 element.setAttribute("onmouseleave", "ck_edits()");}
		}
	    }*/

	if (Math.random() <= 0.5) {
	    bark = new Audio("fail-trombone.mp3");
	    finiteB= new Audio("finitebound.m4a");
	    pivotF=new Audio("you'restuck.m4a");
            meg = new Audio("Home_Run.mp3");
            dothat= new Audio("Clicklbub.m4a");
	} else if (0.5< Math.random() <= 1){
	    bark = new Audio("Tryagain.mp3");
	    finiteB= new Audio("Downtoearth.m4a");
	    pivotF=new Audio("can'tpivot.m4a");
	    meg = new Audio("goodjob.m4a");
	    dothat=new Audio("Chooselbub.m4a");
	} else{
	    bark = new Audio("doomed.m4a");
	    finiteB= new Audio("doomed.m4a");
	    pivotF=new Audio("doomed.m4a");
	    meg = new Audio("deduction.mp3");
	    dothat=new Audio("Chooselbub.m4a");
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

	for (j=1; j<=n; j++) {nonbasics[j] = j;}
	for (i=1; i<=m; i++) {basics[i] = n+j;}
	
	if (first_call == true) {
           first_call = false;
           var query = window.location.search.substring(1); // the 1 strips off the ? character
           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if (pair[0] == "example") {
                  setExercise(pair[1]);
               }
           }
       }

        // ==================================================
	
	listlen = 0;
	for (var i=0; i<100; i++) rowlist[i] = -1;
	for (var i=0; i<100; i++) ublist[i] = -1;
	for (var i=0; i<100; i++) lblist[i] = -1;
	for (var i=0; i<100; i++) lowlist[i] = -1;
	
	for (i=0; i<=m+2; i++) {
	 	//var wid1=  document.getElementById("lb"+0).value.visualLength()+40;
         	var wid2=  document.getElementById("vb"+0).value.visualLength()+50;
         	//var element = document.getElementById("lb"+i);
                //element.style.width = wid1+"px";
             	//var element1 = document.getElementById("ub"+i);
               // element1.style.width = wid1+"px";
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
       
	     //var wid = document.getElementById("ub"+0).value.visualLength()+20;
            
             //var element = document.getElementById("lb"+0);
              //   element.style.width = wid+"px";
      
	if (ctx!=null) {
	    if (nonbasics[1]==1 && nonbasics[2]==2) {
           	plotwid = 400;
	   	ctx.fillStyle = "rgb(255,255,255)";
	   	ctx.fillRect(0,0,plotwid,plotwid);
	    }
	}

	for (j=1; j<=m; j++) {
	     document.getElementById("w"+j+","+(n+1)).value = wlabel[j];
            document.getElementById("w"+j+","+(n+2)).value = wlabel[j];
       
	     var wid = document.getElementById("x"+(m+1)+","+1).value.visualLength()+20;
            
                 var element = document.getElementById("w"+j+","+(n+1));
                 element.style.width = wid+"px";
		 element.disabled=true;

                 var element = document.getElementById("w"+j+","+(n+2));
                 element.style.width = wid+"px";
		 element.disabled=true;
              
	}
       
	
} else{

	add("text","  "    ,1 ,0,"readonly","equals","e2"  );

	add("text","LB",1 ,0,"readonly","fixvar"  ,"lb"+0);
	add("text"," ",1,0,"readonly"        ,"whitevar"   ,"w"+0+","+(n+1));

     	add("text",""       ,1 ,0,"readonly","sign" ,"e3"  );


   	add("text","UB",1 ,0,"readonly","fixvar" ,"ub"+0);

	add("text"," ",1,0,"readonly"        ,"whitevar"   ,"w"+0+","+(n+2));

      	//add("text"," "    ,1 ,0,"readonly","sign","e4" );
  
	/*var element = document.getElementById("lb"+0);
	element.setAttribute("onclick","lbgotChoice()");
	    
	var element1 = document.getElementById("ub"+0);
	element1.setAttribute("onclick","ubgotChoice()");*/
	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+0);
	rowElement.appendChild(element);

	for (i=1; i<=m; i++) {
     
      		add("button","",1,i,"readonly","fixvar","mb"+i);
            	document.getElementById("mb"+i).style.textAlign = "left";
     		
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

		} 
	
		add("text"," = "    ,1 ,i,"readonly","equals","e1"+i   );
	
         	add("text"  ,"0"           ,1 ,i,""    ,"val"   ,"vb"+i);
          
		add("text","  "    ,1 ,i,"readonly","equals","e2"+i   );
		
		add("text","0",1 ,i,"","val"   ,"lb"+i);
		

		add("button","lb"+i,"",i,""        ,"butvar"   ,"w"+i+","+(n+1));
		

	    	element = document.getElementById("w"+i+","+(n+1));
		element.disabled=true;

 
     		add("text",""       ,1 ,i,"readonly"        ,"sign" ,"e3"+i  );
     		add("text","0",1 ,i,"","val"   ,"ub"+i);
		add("button","ub"+i,"",i,""        ,"butvar"   ,"w"+i+","+(n+2));

	    	element = document.getElementById("w"+i+","+(n+2));
		element.disabled=true;

      		//add("text"," "    ,1 ,i,"readonly","sign","e4"+i  );
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
   

        add("text","",1,m+1,"readonly","fixvar","mb"+(m+1));
        document.getElementById("mb"+(m+1)).style.textAlign = "left";
        
        add("text","  "     ,1,m+1,"readonly","val","e01"      );
  
	add("text","  "     ,3,m+1,"readonly","equals","e02"      );
	
	add("text","  "     ,5,m+1,"readonly","val","e03"      );
	
   
     	for (j=1; j<=n; j++) {
		
                    add("text"  ,"  "        ,3,m+1,"readonly","sign" ,"minus"+(m+1)+","+j   );
                  
	            add("text"  ,"0"           ,5,m+1,""        ,"val"   ,"l"+(m+1)+","+j);
                    
		    add("button",xlabel[j]+"",3,m+1,"","butvar"   ,"x"+(m+1)+","+j);
		
	} 

	add("text","  "    ,1 ,m+1,"readonly","equals","e1"+(m+1)  );
         
	add("text"  ,""           ,1 ,m+1,"readonly","val" ,"vb"+(m+1) );
        
	add("text","  "    ,1 ,m+1,"readonly","equals","e2"+(m+1)  );
	
	add("text","",1 ,m+1,"readonly","whitevar"  ,"lb"+(m+1));

	add("text"," ",1,m+1,"readonly"        ,"whitevar"   ,"w"+(m+1)+","+(n+1));
     
	add("text",""       ,1 ,m+1,"readonly","sign" ,"e3"+(m+1)  );

        add("text","",1 ,m+1,"readonly","whitevar" ,"ub"+(m+1));

	add("text"," ",1,m+1,"readonly"        ,"whitevar"   ,"w"+(m+1)+","+(n+2));
      
	//add("text"," "    ,1 ,m+1,"readonly","sign","e4"+(m+1) );

	add("text","",1,m+2,"readonly","fixvar","mb"+(m+2));
        document.getElementById("mb"+(m+2)).style.textAlign = "left";
          
	add("text","  "     ,1,m+2,"readonly","val","e04"      );
  
	add("text","  "     ,3,m+2,"readonly","equals","e05"      );
	
	add("text","  "     ,5,m+2,"readonly","val","e06"      );

     	for (j=1; j<=n; j++) {
                    
              add("text"  ,"  "        ,3,m+2,"readonly","sign" ,"minus"+(m+2)+","+j   );
                  
	      add("text"  ,"0"           ,5,m+2,""        ,"val"   ,"u"+(m+2)+","+j);
                  
	      add("button",xlabel[j]+"","",m+2,"","butvar"   ,"x"+(m+2)+","+j);
		
	} 
	
	add("text","  "    ,1 ,m+2,"readonly","equals","e1"+(m+2)  );
         
	add("text"  ,""           ,1 ,m+2,"readonly","val" ,"vb"+(m+2) );
           
	add("text","  "    ,1 ,m+2,"readonly","equals","e2"+(m+2)  );

	add("text","",1 ,m+2,"readonly","whitevar"  ,"lb"+(m+2));

	add("text"," ",1,m+2,"readonly"        ,"whitevar"   ,"w"+(m+2)+","+(n+1));
     
	add("text",""       ,1 ,m+2,"readonly","sign" ,"e3"+(m+2)  );

	add("text","",1 ,m+2,"readonly","whitevar" ,"ub"+(m+2));

	add("text"," ",1,m+2,"readonly"        ,"whitevar"   ,"w"+(m+2)+","+(n+2));
   
	//add("text"," "    ,1 ,m+2,"readonly","sign","e4"+(m+2) );

	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+2));
	rowElement.appendChild(element);
        
	element = document.createElement("br");
	rowElement = document.getElementById("rowStuff"+(m+2));
	rowElement.appendChild(element);
    
	add("button", "", 80, m+3, "readonly", "fixval", "basicvars");
	add("button", "", 80, m+4, "readonly", "fixval", "nonbasicvars");
	for (i=1; i<=m; i++) {
	    for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+i+","+j);
	        element.setAttribute("onclick","gotClicked("+i+","+j+")");
	    }
	}

 	var element = document.getElementById("md0");
	element.setAttribute("onclick","pbgotClicked()");

 	for(i=1;i<=m;i++){
 		var element = document.getElementById("w"+i+","+(n+1));
		element.setAttribute("onclick","lbgotChoice("+i+")");
	}
	for(i=1;i<=m;i++){
		var element = document.getElementById("w"+i+","+(n+2));
		element.setAttribute("onclick","ubgotChoice("+i+")");
	}

	for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+(m+1)+","+j);
	        element.setAttribute("onclick","lowgotChoice("+j+")");
	}
	
 	for (j=1; j<=n; j++) {
	        var element = document.getElementById("x"+(m+2)+","+j);
	        element.setAttribute("onclick","lowgotChoice("+j+")");
	}
	
	if (Math.random() <= 0.5) {
	    bark = new Audio("fail-trombone.mp3");
	    finiteB= new Audio("finitebound.m4a");
	    pivotF=new Audio("you'restuck.m4a");
            meg = new Audio("Home_Run.mp3");
            dothat= new Audio("Clicklbub.m4a");
	} else if (0.5< Math.random() <= 1){
	    bark = new Audio("Tryagain.mp3");
	    finiteB= new Audio("Downtoearth.m4a");
	    pivotF=new Audio("can'tpivot.m4a");
	    meg = new Audio("goodjob.m4a");
	    dothat=new Audio("Chooselbub.m4a");
	} else{
	    bark = new Audio("doomed.m4a");
	    finiteB= new Audio("doomed.m4a");
	    pivotF=new Audio("doomed.m4a");
	    meg = new Audio("deduction.mp3");
	    dothat=new Audio("Chooselbub.m4a");
	}

	obj = 0;
	vb0=0;
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

	/*toGrid();
	if ((n==2) && ctx!=null) {
	    if (nonbasics[1]==1 && nonbasics[2]==2) {
           	plotwid = 400;
	   	ctx.fillStyle = "rgb(255,255,255)";
	   	ctx.fillRect(0,0,plotwid,plotwid);
	    }
	}*/

	for (j=1; j<=n; j++) {nonbasics[j] = j;}
	for (i=1; i<=m; i++) {basics[i] = n+j;}
	
	if (first_call == true) {
           first_call = false;
           var query = window.location.search.substring(1); // the 1 strips off the ? character
           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if (pair[0] == "example") {
                  setExercise(pair[1]);
               }
           }
       }

        // ==================================================

	listlen = 0;
	for (var i=0; i<100; i++) rowlist[i] = -1;
	for (var i=0; i<100; i++) ublist[i] = -1;
	for (var i=0; i<100; i++) lblist[i] = -1;
	for (var i=0; i<100; i++) lowlist[i] = -1;
		
	for (i=0; i<=m+2; i++) {
	 	var wid1=  document.getElementById("lb"+0).value.visualLength()+40;
         	var wid2=  document.getElementById("vb"+0).value.visualLength()+50;
         	//var wid3=  document.getElementById("w"+0+","+(n+1)).value.visualLength()+50;
         	var element = document.getElementById("lb"+i);
                element.style.width = wid1+"px";
             	var element1 = document.getElementById("ub"+i);
                element1.style.width = wid1+"px";
                var element2 = document.getElementById("vb"+i);
                element2.style.width = wid2+"px";
                /*var element3 = document.getElementById("w"+i+","(n+1));
                element3.style.width = wid3+"px";
                var element4 = document.getElementById("w"+i+","(n+2));
                element4.style.width = wid3+"px";*/
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
	for(j=n+1; j<=n+2; j++){
		for (i=1; i<=m; i++) {

	     		document.getElementById("w"+i+","+(n+1)).value = "lb";
       			
	     		document.getElementById("w"+i+","+(n+2)).value = "ub";
	     		var wid = document.getElementById("w"+i+","+(n+2)).value.visualLength()+20;
                 	var element = document.getElementById("w"+i+","+j);
                 	element.style.width = wid+"px";
			var element1 = document.getElementById("w"+(m+1)+","+j);
                 	element1.style.width = wid+"px";
			var element2 = document.getElementById("w"+(m+2)+","+j);
                 	element2.style.width = wid+"px";
         	}
	}
  }
       
	console.log("start");
	toGrid();
	
	
}



 function ck_edits() {
        var eps = 1e-4;
        var factor;
	listlen=0;
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
    	/*if (method != "Klee-Minty") {
	  for (i=1; i<=m; i++) {
	    vbb = fracDivide(document.getElementById("vb"+i).value);
	    if (Math.abs(vb[i] - vbb/factor) > eps) {vb[i] = vbb/factor;}
	  }
	}*/
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
	var basicrow;
	
	basicrow = basics[row];
	basics[row] = nonbasics[col];
	nonbasics[col] = basicrow;

	for (i=1; i<=m; i++) { acol[i] = a[i][col]; }
	for (j=1; j<=n; j++) { arow[j] = a[row][j]; }
	arowcol = a[row][col];

	
   	document.getElementById("w"+row).value = entering;
	for (i=0; i<=m; i++) {
	     document.getElementById("x"+i+","+col).value = leaving;
	}
 	   
   
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
  		if (document.getElementById("vb"+i).className=="pinkval") {
  			optflag = false;
  		}
  	}
  	for (j=mmn+1; j<=n; j++) {
		element=document.getElementById("c"+j);
  		if (element.className=="pinkval") {
  			optflag = false;
  		}
	}
	for (j=1; j<=n; j++) {
		element=document.getElementById("l"+(m+1)+","+j);
		element1=document.getElementById("u"+(m+2)+","+j);
  		if (element1.className=="val" && element.className=="val") {
			if( (l[j]!=0 || u[j]!=0) && (l[j]>0 || u[j]<0)) {
  				optflag = false;
			}
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
	var free= true;
  
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
  	/*for(i=1;i<=m;i++){
		if( lb[i]!=-Infinity || ub[i]!=Infinity){
			free=false;
			break;
		}
	}
	
	if(free==true){
		if(document.getElementById("md0").value=="maximize:"){
			for (j=mmn+1; j<=n; j++) {
				if(c[j]<-1e-10 ){
					d_infeas_flag=true;
					if (l[j]!=-Infinity){
						d_infeas_flag=false;
					}
				}		
    				else if(c[j]>1e-10){
					d_infeas_flag=true;
					if (u[j]!=Infinity){
						d_infeas_flag=false;
					}
				}
				if(d_infeas_flag==true) break;
			}
        	} else {
			for (j=mmn+1; j<=n; j++) {
				if(c[j]>1e-10){
					d_infeas_flag=true;
					if (l[j]!=-Infinity){
						d_infeas_flag=false;
					}
				}		
    				else if(c[j]<-1e-10){
					d_infeas_flag=true;
					if (u[j]!=Infinity){
						d_infeas_flag=false;
					}
				}
				if(d_infeas_flag==true) break;
			}
        	}		
	} else {*/
		if(document.getElementById("md0").value=="maximize:"){
			for (j=mmn+1; j<=n; j++) {
					if (document.getElementById("l"+(m+1)+","+j).className=="orangeval" && c[j] > 1e-10){
						d_infeas_flag=true;
						//var nodir=true;
						if(u[j]!=Infinity){
							d_infeas_flag=false;
						} else {
							for(i=1;i<=m;i++){
								if ( a[i][j] <- 0.00001){
									//nodir=false;
									if( lb[i]!=-Infinity){
										d_infeas_flag = false;
										break;
									}
								} else if ( a[i][j] >  0.00001){
									//nodir=false;
									if( ub[i]!=Infinity){
										d_infeas_flag = false;
										break;
									}
								}
							}
						}
						if (d_infeas_flag == true) {
  							for (i=1; i<=m; i++) {
  								if (((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i]) ) && a[i][j]==0) {
  			    						d_infeas_flag = false;
  			    						break;
								}
  		    					}
  						}

						/*if(nodir==true && u[j]!=Infinity) {
							d_infeas_flag = false;
  		    				} */
  					} else if (document.getElementById("u"+(m+2)+","+j).className=="purpleval" && c[j] < -1e-10){
  							d_infeas_flag=true;
							//var nodir=true;
							//var nodir=true;
							if(l[j]!=-Infinity){
								d_infeas_flag=false;
							} else {
								for(i=1;i<=m;i++){
									if ( a[i][j] > 0.00001){
										//nodir=false;
										if( lb[i]!=-Infinity){
											d_infeas_flag = false;
											break;
										}
									} else if ( a[i][j] <-  0.00001){
										//nodir=false;
										if( ub[i]!=Infinity){
											d_infeas_flag = false;
											break;
										}
									}
								}
							}
						}
						if (d_infeas_flag == true) {
  							for (i=1; i<=m; i++) {
  								if (((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i]) ) && a[i][j]==0) {
  			    						d_infeas_flag = false;
  			    						break;
								}
  		    					}
  						}
						/*if(nodir==true && u[j]!=Infinity) {
							d_infeas_flag = false;
  		    				} */
						/*for(i=1;i<=m;i++){
							if (document.getElementById("x"+i+","+j).disabled==false && a[i][j] > 0.00001){
								nodir=false;
								d_infeas_flag = false;
								break;
							}
						}
						if(nodir==true && l[j]!=-Infinity) {
							d_infeas_flag = false;
  		    				} 
  					}*/
				
  				
  				if (d_infeas_flag == true) break;
			}
  			
		 } else {
			for (j=mmn+1; j<=n; j++) {
					if (document.getElementById("l"+(m+1)+","+j).className=="orangeval" && c[j] < -1e-10){
						d_infeas_flag=true;
						//var nodir=true;
						if(u[j]!=Infinity){
							d_infeas_flag=false;
						} else {
							for(i=1;i<=m;i++){
								if ( a[i][j] <- 0.00001){
									//nodir=false;
									if( lb[i]!=-Infinity){
										d_infeas_flag = false;
										break;
									}
								} else if ( a[i][j] >  0.00001){
									//nodir=false;
									if( ub[i]!=Infinity){
										d_infeas_flag = false;
										break;
									}
								}
							}
						}
						if (d_infeas_flag == true) {
  							for (i=1; i<=m; i++) {
  								if (((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i]) ) && a[i][j]==0) {
  			    						d_infeas_flag = false;
  			    						break;
								}
  		    					}
  						}

						/*if(nodir==true && u[j]!=Infinity) {
							d_infeas_flag = false;
  		    				} */
  					} else if (document.getElementById("u"+(m+2)+","+j).className=="purpleval" && c[j] > 1e-10){
  							d_infeas_flag=true;
							//var nodir=true;
							//var nodir=true;
							if(l[j]!=-Infinity){
								d_infeas_flag=false;
							} else {
								for(i=1;i<=m;i++){
									if ( a[i][j] > 0.00001){
										//nodir=false;
										if( lb[i]!=-Infinity){
											d_infeas_flag = false;
											break;
										}
									} else if ( a[i][j] <-  0.00001){
										//nodir=false;
										if( ub[i]!=Infinity){
											d_infeas_flag = false;
											break;
										}
									}
								}
							}
							if (d_infeas_flag == true) {
  								for (i=1; i<=m; i++) {
  									if (((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i]) ) && a[i][j]==0) {
  			    							d_infeas_flag = false;
  			    							break;
									}
  		    						}
  							}
						}
						/*if(nodir==true && u[j]!=Infinity) {
							d_infeas_flag = false;
  		    				} */
						/*for(i=1;i<=m;i++){
							if (document.getElementById("x"+i+","+j).disabled==false && a[i][j] > 0.00001){
								nodir=false;
								d_infeas_flag = false;
								break;
							}
						}
						if(nodir==true && l[j]!=-Infinity) {
							d_infeas_flag = false;
  		    				}
  					}*/
				
  				/*if (d_infeas_flag == true) {
  					for (i=1; i<=m; i++) {
  						if ((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i])) {
  			    					d_infeas_flag = false;
  			    				break;
						}
  		    			}
  				}*/
  				if (d_infeas_flag == true) break;
			}
		}
  			
			/*for (j=mmn+1; j<=n; j++) {
					if (document.getElementById("l"+(m+1)+","+j).className=="orangeval" && c[j] <- 1e-10){
						d_infeas_flag=true;
						var nodir=true;
						for(i=1;i<=m;i++){
							if (document.getElementById("x"+i+","+j).disabled==false && a[i][j] > 0.00001){
								nodir=false;
								d_infeas_flag = false;
								break;
							}
						}
						if(nodir==true && u[j]!=Infinity) {
							d_infeas_flag = false;
  		    				} 
  					} else if (document.getElementById("u"+(m+2)+","+j).className=="purpleval" && c[j] > 1e-10){
  						d_infeas_flag=true;
						var nodir=true;
						for(i=1;i<=m;i++){
							if (document.getElementById("x"+i+","+j).disabled==false && a[i][j] <- 0.00001){
								nodir=false;
								d_infeas_flag = false;
								break;
							}
						}
						if(nodir==true && l[j]!=-Infinity) {
							d_infeas_flag = false;
  		    				} 
  					}*/
				
  				/*if (d_infeas_flag == true) {
  					for (i=1; i<=m; i++) {
  						if ((vb[i] < 1e-10*lb[i])||(vb[i] > 1e-10*ub[i])) {
  			    					d_infeas_flag = false;
  			    				break;
						}
  		    			}
  				}
  				if (d_infeas_flag == true) break;
			}*/
  			
		// }
	//} 
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
	var lo=[]; var up=[];
  
  	for (i=1; i<=m; i++) {
	    vb[i] = fracDivide(document.getElementById("vb"+i).value);
	}
  
  	for (j=mmn+1; j<=n; j++) { 
	    c[j] = fracDivide(document.getElementById("c"+j).value);
	}
        for (j=mmn+1; j<=n; j++) { 
	    lo[j] = document.getElementById("l"+(m+1)+","+j).className;
	}
	for (j=mmn+1; j<=n; j++) { 
	    up[j] = document.getElementById("u"+(m+2)+","+j).className;
	}
  	for (i=1; i<=m; i++) {
  		for (j=1; j<=n; j++) {
  		   	
			a[i][j] =
				-fracDivide(document.getElementById("a"+i+","+j).value);
  		}
  	}
  
  	for (i=1; i<=m; i++) {
  	    if ((vb[i] < 1e-10*lb[i])) {
  		p_infeas_flag = true;
		if(document.getElementById("md0").value=="maximize:"){
  			for (j=mmn+1; j<=n; j++) {
  		   		if (( lo[j]=="orangeval" && a[i][j] < -0.00001) || (up[j]=="purpleval" && a[i][j] > 0.00001) ) {
  					p_infeas_flag = false;
  					break;
  		    		}
  			}

	     		if (p_infeas_flag == true) break;
		} else {
  			for (j=mmn+1; j<=n; j++) {
  		   		if (( lo[j]=="orangeval" && a[i][j] > 0.00001) || (up[j]=="purpleval" && a[i][j] <- 0.00001) ) {
  					p_infeas_flag = false;
  					break;
  		    		}
  			}

	     		if (p_infeas_flag == true) break;
		}
	   }
	   if ((vb[i] > 1e-10*ub[i])) {
  		p_infeas_flag = true;
		if(document.getElementById("md0").value=="maximize:"){
  			for (j=mmn+1; j<=n; j++) {
  		    		if (( lo[j]=="orangeval" && a[i][j] > 0.00001) || (up[j]=="purpleval" && a[i][j] <- 0.00001) ) {
  					p_infeas_flag = false;
  					break;
  		    		}
  			}
 			if (p_infeas_flag == true) break;
	   	} else {
  			for (j=mmn+1; j<=n; j++) {
  		    		if (( lo[j]=="orangeval" && a[i][j] <- 0.00001) || (up[j]=="purpleval" && a[i][j] > 0.00001) ) {
  					p_infeas_flag = false;
  					break;
  		    		}
  			}
 			if (p_infeas_flag == true) break;
	   	}

  	   }
	}
  
  	if (p_infeas_flag== true ) {
  		// reset();
  		meg.play();
  	} else {
  		bark.play();
	}
  }

  function makePlot() {
        var eps;
        if ( (n==2 ) && ctx != null) {
	  if (
                  (n==2 && nonbasics[1]==1 && nonbasics[2]==2) 
             ){
           plotwid = 400;
	   ctx.fillStyle = "rgb(255,255,255)";
	   ctx.fillRect(0,0,plotwid,plotwid);      
	
   	for (i=1; i<=2; i++) {
		ctx.fillStyle   = 'rgba('+82+', '+45+', '+128+','+.2+')';
		if(l[i]!=-Infinity && u[i]!=Infinity)
		{ 
			ctx.beginPath();
			xx =  l[i]; yy = -20;
	      		if(i==1){ ctx.moveTo(xpx(xx),ypx(yy));} 
			else{ ctx.moveTo(xpx(yy),ypx(xx));}
	      		xx =  u[i];
	      		yy = -20;
	      		if(i==1){ ctx.lineTo(xpx(xx),ypx(yy));}
			else{ ctx.lineTo(xpx(yy),ypx(xx));}
	      		xx =  u[i]; 
			yy = 20;
	      		if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
	      		xx =  l[i]; 
			yy = 20;
			if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}

	      		ctx.closePath();
	      		ctx.fill();
			ctx.beginPath();
			ctx.strokeStyle = "black"
	      		ctx.strokeStyle = 'rgb('+82+', '+45+', '+128+')';
	        	xx = l[i]; 
			yy = -2;
	        	if(i==1){ctx.moveTo(xpx(xx),ypx(yy));}
			else{ctx.moveTo(xpx(yy),ypx(xx));}
	        	xx =  l[i]; 
			yy = 9;
	        	if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
			ctx.closePath();
	      		ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "black";
	      		ctx.strokeStyle = 'rgb('+82+', '+45+', '+128+')';
	        	xx = u[i]; 
			yy = -2;
	        	if(i==1){ctx.moveTo(xpx(xx),ypx(yy));}
			else{ctx.moveTo(xpx(yy),ypx(xx));}
	        	xx =  u[i]; 
			yy = 9;
	        	if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
			ctx.closePath();
			ctx.stroke();
		}
		if(l[i]==-Infinity && u[i]!=Infinity){ 
			ctx.beginPath();
	      		xx =  u[i];
	      		yy = -20;
	      		if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
	      		xx =  -20; 
			yy = 20;
	      		if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
	      		xx =  u[i]; 
			yy = 20;
			if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle = "black";
	      		ctx.strokeStyle = 'rgb('+82+', '+45+', '+128+')';
	        	xx = u[i]; 
			yy = -2;
	        	if(i==1){ctx.moveTo(xpx(xx),ypx(yy));}
			else{ctx.moveTo(xpx(yy),ypx(xx));}
	        	xx =  u[i]; 
			yy = 9;
	        	if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
			ctx.closePath();
	 		ctx.stroke();
		}
		if(l[i]!=-Infinity && u[i]==Infinity){ 
			ctx.beginPath();
	      		xx =  l[i];
	      		yy = -20;
	      		if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
	      		xx =  20; 
			yy = -20;
	      		if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
	      		xx =  l[i]; 
			yy = 20;
			if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
			ctx.closePath();
	      		ctx.fill();
			ctx.strokeStyle = "black";
			ctx.strokeStyle = 'rgb('+255+','+0+', '+0+')';
	        	xx = l[i]; 
			yy = -2;
	        	if(i==1){ctx.moveTo(xpx(xx),ypx(yy));}
			else{ctx.moveTo(xpx(yy),ypx(xx));}
	        	xx =  l[i]; 
			yy = 9;
	        	if(i==1){ctx.lineTo(xpx(xx),ypx(yy));}
			else{ctx.lineTo(xpx(yy),ypx(xx));}
			ctx.closePath();
			ctx.stroke();
		}
	}

        for (i=1; i<=m; i++) {
	      // if (a[i][2] == 0) { a[i][2] = 1; }
	      /*
	      rr = Math.random();
	      gg = Math.random();
	      bb = Math.random();
	      */

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
  	      if((lb[i]!=-Infinity && ub[i]!=Infinity)){ 
		xx =  -20; 
		yy = (lb[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	      	ctx.moveTo(xpx(xx),ypx(yy));
	      	var veclen = Math.sqrt(a[i][1]*a[i][1]+a[i][2]*a[i][2]); 
	      	xx =  -20;
	      	yy = (ub[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	      	ctx.lineTo(xpx(xx),ypx(yy));
	      	xx =  20; yy = (ub[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	      	ctx.lineTo(xpx(xx),ypx(yy));
	      	xx =  20; yy = (lb[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
		ctx.lineTo(xpx(xx),ypx(yy));
	      	ctx.closePath();
	      	ctx.fill();
              	ctx.strokeStyle = "black";
	      	ctx.strokeStyle = 'rgb('+rr0+','+gg0+','+bb0+')';
	      	ctx.beginPath();
	      	if (Math.abs(a[i][2]) > 1e-4) {
	          xx = -2; yy = (lb[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	          ctx.moveTo(xpx(xx),ypx(yy));
	          xx =  9; yy = (lb[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	          ctx.lineTo(xpx(xx),ypx(yy));
	      	} else {
	          yy = -2; xx = (lb[i]-(b[i]+a[i][2]*yy))/(a[i][1]+eps);
	          ctx.moveTo(xpx(xx),ypx(yy));
	          yy =  9; xx = (lb[i]-(b[i]+a[i][2]*yy))/(a[i][1]+eps);
	          ctx.lineTo(xpx(xx),ypx(yy));
	      	} 
		  ctx.closePath();
		  ctx.stroke();
		  ctx.beginPath();
	      	if (Math.abs(a[i][2]) > 1e-4) {
	          xx = -2; yy = (ub[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	          ctx.moveTo(xpx(xx),ypx(yy));
	          xx =  9; yy = (ub[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	          ctx.lineTo(xpx(xx),ypx(yy));
	      	} else {
	          yy = -2; xx = (ub[i]-(b[i]+a[i][2]*yy))/(a[i][1]+eps);
	          ctx.moveTo(xpx(xx),ypx(yy));
	          yy =  9; xx = (ub[i]-(b[i]+a[i][2]*yy))/(a[i][1]+eps);
	          ctx.lineTo(xpx(xx),ypx(yy));
	      	}
              	ctx.closePath();
	      	ctx.stroke();
           } else if(lb[i]!=-Infinity && ub[i]==Infinity){ 
			xx =  -20; 
			yy = (lb[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	      		ctx.moveTo(xpx(xx),ypx(yy));
	      		var veclen = Math.sqrt(a[i][1]*a[i][1]+a[i][2]*a[i][2]); 
	      		xx =  20*a[i][1]/veclen;
	      		yy =  20*a[i][2]/veclen;
	      		ctx.lineTo(xpx(xx),ypx(yy));
	      		xx =  20; 
			yy = (lb[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	      		ctx.lineTo(xpx(xx),ypx(yy));
			ctx.closePath();
	      		ctx.fill();
              		ctx.strokeStyle = "black";
	      		ctx.strokeStyle = 'rgb('+rr0+','+gg0+','+bb0+')';
	      		ctx.beginPath();
	      		if (Math.abs(a[i][2]) > 1e-4) {
	          		xx = -2; 
				yy = (lb[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	          		ctx.moveTo(xpx(xx),ypx(yy));
	          		xx =  9; 
				yy = (lb[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	          		ctx.lineTo(xpx(xx),ypx(yy));
	      		} else {
	          		yy = -2; 
				xx = (lb[i]-(b[i]+a[i][2]*yy))/(a[i][1]+eps);
	          		ctx.moveTo(xpx(xx),ypx(yy));
	          		yy =  9; 
				xx = (lb[i]-(b[i]+a[i][2]*yy))/(a[i][1]+eps);
	          		ctx.lineTo(xpx(xx),ypx(yy));
	      		}
	      		ctx.stroke();
           		}  else { 
				xx =  -20; 
				yy = (ub[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	      			ctx.moveTo(xpx(xx),ypx(yy));
	      			var veclen = Math.sqrt(a[i][1]*a[i][1]+a[i][2]*a[i][2]); 
	      			xx =  -20*a[i][1]/veclen;
	      			yy =  -20*a[i][2]/veclen;
	      			ctx.lineTo(xpx(xx),ypx(yy));
	      			xx =  20; 
				yy = (ub[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	      			ctx.lineTo(xpx(xx),ypx(yy));
				ctx.closePath();
	      			ctx.fill();
              			ctx.strokeStyle = "black";
	      			ctx.strokeStyle = 'rgb('+rr0+','+gg0+','+bb0+')';
	      			ctx.beginPath();
	      			if (Math.abs(a[i][2]) > 1e-4) {
	          		xx = -2; 
				yy =(ub[i] -(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	          		ctx.moveTo(xpx(xx),ypx(yy));
	          		xx =  9; 
				yy = (ub[i]-(b[i]+a[i][1]*xx))/(a[i][2]+eps);
	          		ctx.lineTo(xpx(xx),ypx(yy));
	      		} else {
	          		yy = -2; 
				xx = (ub[i]-(b[i]+a[i][2]*yy))/(a[i][1]+eps);
	          		ctx.moveTo(xpx(xx),ypx(yy));
	          		yy =  9; 
				xx = (ub[i]-(b[i]+a[i][2]*yy))/(a[i][1]+eps);
	          		ctx.lineTo(xpx(xx),ypx(yy));
	      		}
	      		ctx.stroke();
           	}
	}
        for (i=1; i<=m; i++) {
        	if (a[i][1] == 0 && a[i][2] == 0) break;
	      	ctx.strokeStyle = 'rgb(0,0,0)';
	      	ctx.fillStyle   = 'rgb(0,0,0)';
	      	ctx.font = "18px Letter Gothic Std, sans-serif";
	      	//var hit = 15;
		if(lb[i]!=-Infinity){
			var txt = document.getElementById("w"+i).value+'='+lb[i];
	      		var wid = ctx.measureText(txt).width;
	      		var xs = [], ys = [];
	      		var x2 = [], y2 = [];
	      		var cnt = 0;
	      		xs[0] =  -2; ys[0] = (lb[i]-(b[i]+a[i][1]*xs[0]))/(a[i][2]+eps);
	      		xs[1] =   9; ys[1] = (lb[i]-(b[i]+a[i][1]*xs[1]))/(a[i][2]+eps);
	      		ys[2] =  -2; xs[2] = (lb[i]-(b[i]+a[i][2]*ys[2]))/(a[i][1]+eps);
	      		ys[3] =   9; xs[3] = (lb[i]-(b[i]+a[i][2]*ys[3]))/(a[i][1]+eps);
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
	      		//ctx.fillText(txt, xpx(xx)-wid/2,     ypx(yy)+hit/3);
		}
		if(ub[i]!=Infinity){
			var txt = document.getElementById("w"+i).value+'='+ub[i];
	      		var wid = ctx.measureText(txt).width;
	      		var xs = [], ys = [];
	      		var x2 = [], y2 = [];
	      		var cnt = 0;
	      		xs[0] =  -2; ys[0] = (ub[i]-(b[i]+a[i][1]*xs[0]))/(a[i][2]+eps);
	      		xs[1] =   9; ys[1] = (ub[i]-(b[i]+a[i][1]*xs[1]))/(a[i][2]+eps);
	      		ys[2] =  -2; xs[2] = (ub[i]-(b[i]+a[i][2]*ys[2]))/(a[i][1]+eps);
	      		ys[3] =   9; xs[3] = (ub[i]-(b[i]+a[i][2]*ys[3]))/(a[i][1]+eps);
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
	      		yy =p*y2[0]+q*y2[1];
	      		ctx.save();
	      		ctx.translate(xpx(xx),ypx(yy));
	      		ctx.rotate(Math.atan(a[i][1]/(a[i][2]+eps)));
	      		ctx.textAlign = "center";
	      		ctx.fillText(txt, 0, 0);
	      		ctx.restore();
	      		// ctx.fillText(txt, xpx(xx)-wid/2,     ypx(yy)+hit/3);
		}

	   
	}
	for (i=1;i<=2;i++){
		if(l[i]!=Infinity){
			txt = document.getElementById("x0,"+i).value+'='+l[i];
	   		wid = ctx.measureText(txt).width;
	    		if(i==1){ 
				xx = l[i];
	   			yy = 5.4+Math.random()-0.5; ctx.save();
	   			ctx.translate(xpx(xx),ypx(yy));
	   			ctx.rotate(-Math.PI/2);
	   			ctx.textAlign = "center";
	   			ctx.fillText(txt, 0, 0);
	   			ctx.restore();
			}else{
				yy = l[i];
	   			xx = l[i]; ctx.save();
	   			ctx.translate(xpx(xx),ypx(yy));
	   			ctx.textAlign = "center";
	   			ctx.fillText(txt, 0, 0);
	   			ctx.restore();
			}
	  
	   		// ctx.fillText(txt, xpx(xx)-wid/2,     ypx(yy)+hit/3);
		}
              	if(u[i]!=Infinity){
			txt = document.getElementById("x0,"+i).value+'='+u[i];
	   		wid = ctx.measureText(txt).width;
			if(i==1){
				xx =u[i];
	   			yy = 5.2 +Math.random()-0.5;
	   			ctx.save();
	   			ctx.translate(xpx(xx),ypx(yy));
	   			ctx.rotate(-Math.PI/2);
	   			ctx.textAlign = "center";
	   			ctx.fillText(txt, 0, 0);
	   			ctx.restore();
			}else{ 
				yy = u[i];
	   			xx = 5.2 +Math.random()-0.5; ctx.save();
	   			ctx.translate(xpx(xx),ypx(yy));
	   			ctx.textAlign = "center";
	   			ctx.fillText(txt, 0, 0);
	   			ctx.restore();
			}
	   
	   		// ctx.fillText(txt, xpx(xx)-wid/2,     ypx(yy)+hit/3);
		}
	}
	rr = 10;
	gg = 10;
	bb = 10;
	// Draw grid
	ctx.strokeStyle = 'rgba('+rr+','+gg+','+bb+','+0.1+')';
	for (i=-2; i<=9; i++) {
		ctx.beginPath();
	     	ctx.moveTo(xpx( -9.), ypx(i));
	     	ctx.lineTo(xpx(  9.), ypx(i));
	     	ctx.stroke();
	     	ctx.beginPath();
	     	ctx.moveTo(xpx(  i), ypx( -9.));
	     	ctx.lineTo(xpx(  i), ypx(  9.));
	     	ctx.stroke();
	}
		/*ctx.strokeStyle = 'rgba('+rr+','+gg+','+bb+','+0.8/(m+2)+')';
		ctx.fillStyle   = 'rgba('+rr+','+gg+','+bb+','+0.2/(m+2)+')';
	   	ctx.beginPath();
	   	ctx.moveTo(xpx( 0.),ypx(-9.));
	   	ctx.lineTo(xpx( 9.),ypx(-9.));
	   	ctx.lineTo(xpx( 9.),ypx( 9.));
	   	ctx.lineTo(xpx( 0.),ypx( 9.));
	   	ctx.closePath();
	   	ctx.fill();
	   	ctx.strokeStyle = 'rgb('+rr+','+gg+','+bb+')';
	   	ctx.beginPath();
	   	ctx.moveTo(xpx( 0.), ypx(-9.));
	   	ctx.lineTo(xpx( 0.), ypx( 9.));
	   	ctx.stroke();
	   	ctx.strokeStyle = 'rgba('+rr+','+gg+','+bb+','+0.8/(m+2)+')';
	   	ctx.fillStyle   = 'rgba('+rr+','+gg+','+bb+','+0.2/(m+2)+')';
	   	ctx.beginPath();
	   	ctx.moveTo(xpx(-9.),ypx( 0.));
	   	ctx.lineTo(xpx(-9.),ypx( 9.));
	   	ctx.lineTo(xpx( 9.),ypx( 9.));
	   	ctx.lineTo(xpx( 9.),ypx( 0.));
	   	ctx.closePath();
	   	ctx.fill();
	   	ctx.strokeStyle = 'rgb('+rr+','+gg+','+bb+')';
	   	ctx.fillStyle   = 'rgb('+rr+','+gg+','+bb+')';
	   	ctx.beginPath();
	   	ctx.moveTo(xpx( -9.), ypx(0.));
	   	ctx.lineTo(xpx(  9.), ypx(0.));
	   	ctx.stroke();

	   	ctx.font = "12px Letter Gothic Std, sans-serif";
	   	ctx.fillText("-2", xpx(-2.0 ), ypx(-0.3 ));
	   	ctx.fillText( "9", xpx( 8.8 ), ypx(-0.3 ));
	   	ctx.fillText("-2", xpx(-0.42), ypx(-2.0 ));*/
	   	//ctx.fillText( "0", xpx(-0.3 ), ypx(-0.3 ));
	   	//ctx.fillText( "9", xpx(-0.3 ), ypx( 8.7 ));
	  }
	if(nonbasics[1]==1 && nonbasics[2]==2){
		if(document.getElementById("l"+(m+1)+","+1).className!="val") xx=l[1];
		else xx=u[1];
		if(document.getElementById("l"+(m+1)+","+2).className!="val") yy=l[2];
		else yy=u[2];	
	}
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
	tmp = ""+myformat(vb0);
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
            document.getElementById("mb"+i).setAttribute("size", tmp);
	}
	

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
			if (document.getElementById("md0").className=="maxvar"){
             
 				if( (element2.className=="purpleval" &&c[j]<-1e-10)||
				(element1.className=="orangeval" &&c[j]>1e-10)){ 
					
					element.className="pinkval"; 
                        		document.getElementById("x0,"+j).className = "var"; 
				}
			} else {
             
 				if( (element2.className=="purpleval" &&c[j]>1e-10)||
				(element1.className=="orangeval" &&c[j]<-1e-10)){ 
					
					element.className="pinkval"; 
                        		document.getElementById("x0,"+j).className = "var"; 
				}
			}
         
	     		nnv1 += l[j] + " \u2264" +  document.getElementById("x0,"+j).value +"\u2264 " +u[j];
	   		if(j<n){nnv1 +=";  ";}
	    	   }
	    }

	   for (i=1; i<=m+2; i++) {
            	element = document.getElementById("mb"+i); 
            	if (fmt == "Integer" && maxden != 1) { 
                    element.value = ""+maxden; 
            	} else { 
                    element.value = ""; 
            	}
	   }
	   for (i=1; i<=m; i++) {
            	element = document.getElementById("lb"+i); 
            	if (fmt == "Integer" && maxden != 1) { 
                    element.value = ""+maxden; 
            	} else { 
                    element.value = ""; 
            	}
	   }
	   for (i=1; i<=m; i++) {
            	element = document.getElementById("ub"+i); 
            	if (fmt == "Integer" && maxden != 1) { 
                    element.value = ""+maxden; 
            	} else { 
                    element.value = ""; 
            	}
	   }

	   element = document.getElementById("md0"); 
	   if(element.className=="maxvar:"){
	   	if (fmt == "Integer" && maxden != 1) { 
            		element.value = "maximize:"+maxden; 
	   	} else { 
            		element.value = "maximize:"; 
       	   	} 
	   }
	   if(element.className=="minvar:"){
	   	if (fmt == "Integer" && maxden != 1) { 
            		element.value = "minimize:"+maxden; 
	   	} else { 
            		element.value = "minimize:"; 
       	   	} 
	   }
	   element = document.getElementById("vb"+0); 
	   if (fmt == "Integer" && maxden != 1) { 
            	element.value = "   "+maxden; 
	   } else { 
            	element.value = "   "; 
       	   }
           
	   element = document.getElementById("mb1"); 
	   if (fmt == "Integer" && maxden != 1) { 
            	element.value = "subject to:   "+maxden; 
	   } else { 
            	element.value = "subject to:"; 
       	   } 
	   element = document.getElementById("mb1"); 
	   if (fmt == "Integer" && maxden != 1) { 
            	element.value = " "+maxden; 
	   } else { 
            	element.value = " "; 
       	   } 
	   element = document.getElementById("mb1"); 
	   if (fmt == "Integer" && maxden != 1) { 
            	element.value = "subject to:   "+maxden; 
	   } else { 
            	element.value = "subject to:"; 
       	   }

	   for (i=1; i<=m; i++) {
		if (method != "Klee-Minty") {
           		element = document.getElementById("vb"+i);  
           		var element1 = document.getElementById("lb"+i);  
           		var  element2 = document.getElementById("ub"+i);  
	   		element.value = myformat2(vb[i]);
           		element1.value = myformat2(lb[i]);
           		element2.value = myformat2(ub[i]);
          
	   		if ((lb[i] > vb[i]) || (ub[i] < vb[i])) { 
				element.className = "pinkval"; 
	   		} else if(Math.abs(vb[i]) <1e-10){ 
                        	if (vis == "Dimmed") {
                             		element.className = "zeroval"; 
				} else if (vis == "Invisible") {
                             		element.className = "whiteval"; 
				} else if (vis == "Visible") {
                             		element.className = "val"; 
				} 
           		} else { element.className = "val"; }
		}
        
		nnv += document.getElementById("lb"+i).value + " \u2264" +  
		document.getElementById("w"+i).value +" \u2264" +document.getElementById("ub"+i).value;
		if(i<m){nnv+=";  ";}	
 	    }

	    for (i=1; i<=m; i++) {
		element = document.getElementById("b"+i);
		element.value = myformat2(b[i]);
		if (Math.abs(b[i]) < 1e-10) { 
             		if (vis == "Dimmed"){ element.className = "zeroval"; } else 
	     		if (vis == "Invisible") { element.className = "whiteval"; } else
             		if (vis == "Visible")   { element.className = "val"; } 
        	} else { element.className = "val"; }
		
	    }

	    for (i=1; i<=m; i++) {
	    	for (j=1; j<=n; j++) {
			element = document.getElementById("a"+i+","+j);
			element.value = myformat2(-a[i][j]);
	        	if (Math.abs(a[i][j]) < 1e-10) { 
                  		if (vis == "Dimmed")    { element.className = "zeroval"; } else
                  		if (vis == "Invisible") { element.className = "whiteval"; } else
                  		if (vis == "Visible")   { element.className = "val"; } 
                	} else { element.className = "val"; }
			
	        
			element = document.getElementById("x"+i+","+j);
               	 	if (Math.abs(a[i][j]) < 1e-10 || (lb[i] == -Infinity && ub[i]==Infinity)) { 
                  		if (vis == "Dimmed")    { element.className = "zerobutvar"; element.disabled = true;} else
                  		if (vis == "Invisible") { element.className = "graybutvar"; element.disabled = true; } else
                  		if (vis == "Visible")   { element.className = "butvar";  element.disabled = true;}
               	 	} else { element.className = "butvar";  element.disabled = false;}
 		
	       	 	element = document.getElementById("minus"+i+","+j);
               	 	if (!(method == "Klee-Minty" && j==1)) 
               	 	if (Math.abs(a[i][j]) < 1e-10) { 
                  		if (vis == "Dimmed")    { element.className = "graysign"; } else
                  		if (vis == "Invisible") { element.className = "whitesign"; } else
                  		if (vis == "Visible")   { element.className = "sign"; }
               	 	} else { element.className = "sign"; }
	   	}
	    }

	    for (j=1; j<=n; j++) {
		
                if(u[j]<=l[j]){
			tmp=u[j];
			u[j]=l[j];
			l[j]=tmp; 
		} 
		if(u[j]==-Infinity) u[j]=Infinity;
		if(l[j]==Infinity) l[j]=-Infinity;
		element = document.getElementById("l"+(m+1)+","+j);
		element1 = document.getElementById("u"+(m+2)+","+j);
		element2 = document.getElementById("x"+(m+1)+","+j);
		element3 = document.getElementById("x"+(m+2)+","+j);
		if (l[j]==-Infinity) { 
			element.className = "zeroval";
			if(u[j]!=Infinity){
				element1.className="purpleval";
			}
			if(vis=="Visible"){
				element2.className = "butvar";  element2.disabled = true; 
				element3.className = "butvar";  element3.disabled = true;}
			if(vis=="Invisible"){
				element2.className = "zerobutvar";  element2.disabled = true; 
				element3.className = "zerobutvar";  element3.disabled = true;}
			if(vis=="Dimmed"){
				element2.className = "graybutvar";  element2.disabled = true; 
				element3.className = "graybutvar";  element3.disabled = true;}
		}
		
		if (u[j]==Infinity) { 
			element1.className = "zeroval";
			if(l[j]!=-Infinity){
				element.className="orangeval";
			}
			if(vis=="Visible"){
				element2.className = "butvar";  element2.disabled = true; 
				element3.className = "butvar";  element3.disabled = true;}
			if(vis=="Invisible"){
				element2.className = "zerobutvar";  element2.disabled = true; 
				element3.className = "zerobutvar";  element3.disabled = true;}
			if(vis=="Dimmed"){
				element2.className = "graybutvar";  element2.disabled = true; 
				element3.className = "graybutvar";  element3.disabled = true;}
		} 
		if( l[j] != -Infinity && u[j] != Infinity){ 
				element2.className = "butvar";  element2.disabled = false;
				element3.className = "butvar";  element3.disabled = false;
			
		}
		element.value = myformat2(l[j]);
		element1.value = myformat2(u[j]);
	        if(element.className=="val" || element.className == "zeroval" || element.className == "whiteval"){
			if (Math.abs(l[j]) < 1e-10 ) { 
				if (vis == "Invisible") { element.className = "whiteval"; } else
                  		if (vis == "Dimmed")    { element.className = "zeroval"; } else
                 		if (vis == "Visible")   { 
					if(u[j]==Infinity){ element.className = "orangeval";}
					else { element.className = "val";}
				}
				 
                	} else if(l[j]!=-Infinity) { 
					if(u[j]==Infinity){ element.className = "orangeval";}
					else { element.className = "val";}
			} else { element.className = "zeroval"; }
	        
                	if (Math.abs(l[j]) < 1e-10 ) { 
				if(u[j]!=Infinity){
                  			if (vis == "Dimmed")    { element2.className = "zerobutvar"; element2.disabled = false; } else
                  			if (vis == "Invisible") { element2.className = "graybutvar"; element2.disabled = false; } else
                  			if (vis == "Visible")   { element2.className = "butvar";  element2.disabled = false;}
				} else {
					if (vis == "Dimmed")    { element2.className = "zerobutvar"; element2.disabled = true; } else
                  			if (vis == "Invisible") { element2.className = "graybutvar"; element2.disabled = true; } else
                  			if (vis == "Visible")   { element2.className = "butvar";  element2.disabled = true;}
				}
                	} else if(l[j]!=-Infinity) { 
					if(u[j]!=Infinity){
						element2.className = "butvar";  element2.disabled = false;
					} else { element2.className = "butvar";  element2.disabled = true;}
			} 
 		
	        	element = document.getElementById("minus"+(m+1)+","+j);
                	if (!(method == "Klee-Minty" && j==1)) 
                	if (Math.abs(l[j]) < 1e-10 || l[j]==-Infinity) { 
                  		if (vis == "Dimmed")    { element.className = "graysign"; } else
                  		if (vis == "Invisible") { element.className = "whitesign"; } else
                 		if (vis == "Visible")   { element.className = "sign"; }
                	} else { element.className = "sign"; }
		}
		
		if(element1.className=="val" || element1.className == "zeroval" || element1.className == "whiteval"){
			if (Math.abs(u[j]) < 1e-10 ) { 
				if (vis == "Invisible") { element1.className = "whiteval"; } else
                  		if (vis == "Dimmed")    { element1.className = "zeroval"; } else
                 		if (vis == "Visible")   { 
					if(l[j]==-Infinity){ element1.className = "purpleval";}
					else { element1.className = "val";}
				}
				 
                	} else if(u[j]!=Infinity) { 
					if(l[j]==-Infinity){ element1.className = "purpleval";}
					else { element1.className = "val";}
			} else { element1.className = "zeroval"; }
	        
                	if (Math.abs(u[j]) < 1e-10 ) { 
				if(l[j]!=-Infinity){
                  			if (vis == "Dimmed")    { element3.className = "zerobutvar"; element3.disabled = false; } else
                  			if (vis == "Invisible") { element3.className = "graybutvar"; element3.disabled = false; } else
                  			if (vis == "Visible")   { element3.className = "butvar";  element3.disabled = false;}
				} else {
					if (vis == "Dimmed")    { element3.className = "zerobutvar"; element3.disabled = true; } else
                  			if (vis == "Invisible") { element3.className = "graybutvar"; element3.disabled = true; } else
                  			if (vis == "Visible")   { element3.className = "butvar";  element3.disabled = true;}
				}
                	} else if(u[j]!=Infinity) { 
					if(l[j]!=-Infinity){
						element3.className = "butvar";  element3.disabled = false;
					} else { element3.className = "butvar";  element3.disabled = true;}
			} 
 		
	        	element = document.getElementById("minus"+(m+1)+","+j);
                	if (!(method == "Klee-Minty" && j==1)) 
                	if (Math.abs(u[j]) < 1e-10 || u[j]==Infinity) { 
                  		if (vis == "Dimmed")    { element.className = "graysign"; } else
                  		if (vis == "Invisible") { element.className = "whitesign"; } else
                 		if (vis == "Visible")   { element.className = "sign"; }
                	} else { element.className = "sign"; }
		}
	}
	
	for(i=1;i<=m;i++){
		vb[i]=vbval(i);
		if(ub[i]<=lb[i]){
			tmp=ub[i];
			ub[i]=lb[i];
			lb[i]=tmp;
		}
		if(lb[i]==Infinity) lb[i]=-Infinity;
		if(ub[i]==-Infinity) ub[i]=Infinity;
	
	element= document.getElementById("vb"+0);
	element.value=myformat2(objval());
	element = document.getElementById("lb"+i);
	element1 = document.getElementById("ub"+i);
	/*if(n==2){
		element2 = document.getElementById("w"+i+","+(n+1));
		element3 = document.getElementById("w"+i+","+(m+4));
	
			
			
		
                	if (Math.abs(lb[i]) < 1e-10 ) { 
				
                  			if (vis == "Dimmed")    { element2.className = "zerobutvar"; } else
                  			if (vis == "Invisible") { element2.className = "graybutvar"; } else
                  			if (vis == "Visible")   { element2.className = "butvar"; }
                	} 
 
	        
                	if (Math.abs(ub[i]) < 1e-10 ) { 
				
                  			if (vis == "Dimmed")    { element3.className = "zerobutvar"; } else
                  			if (vis == "Invisible") { element3.className = "graybutvar";} else
                  			if (vis == "Visible")   { element3.className = "butvar";}
				
                	} 
	}*/
	//else{
	element2 = document.getElementById("w"+i+","+(n+1));
	element3 = document.getElementById("w"+i+","+(n+2));
	/*if (lb[i]==-Infinity) { 
			element.className = "zeroval";
			/*if(u[j]!=Infinity){
				element1.className="purpleval";
			}*/
			/*if(vis=="Visible"){
				element2.className = "butvar";  element2.disabled = true; 
				//element3.className = "butvar";  element3.disabled = true;
			}
			if(vis=="Invisible"){
				element2.className = "zerobutvar";  element2.disabled = true; 
				//element3.className = "zerobutvar";  element3.disabled = true;
			}
			if(vis=="Dimmed"){
				element2.className = "graybutvar";  element2.disabled = true; 
				//element3.className = "graybutvar";  element3.disabled = true;
			}
	} else {
				element2.className = "butvar";  element2.disabled = false;
				//element3.className = "butvar";  element3.disabled = false;
		}
		
	if (ub[i]==Infinity) { 
			element1.className = "zeroval";
			/*if(l[j]!=-Infinity){
				element.className="orangeval";
			}*/
			/*if(vis=="Visible"){
				//element2.className = "butvar";  element2.disabled = true; 
				element3.className = "butvar";  element3.disabled = true;
			}
			if(vis=="Invisible"){
				//element2.className = "zerobutvar";  element2.disabled = true; 
				element3.className = "zerobutvar";  element3.disabled = true;
			}
			if(vis=="Dimmed"){
				//element2.className = "graybutvar";  element2.disabled = true; 
				element3.className = "graybutvar";  element3.disabled = true;}
		} 
		else { 
				//element2.className = "butvar";  element2.disabled = false;
				element3.className = "butvar";  element3.disabled = false;
			
		}*/
		/*element.value = myformat2(lb[i]);
		element1.value = myformat2(ub[i]);
	        //if(element.className=="val" || element.className == "zeroval" || element.className == "whiteval"){
			if (Math.abs(lb[i]) < 1e-10 ) { 
				if (vis == "Invisible") { element.className = "whiteval"; } else
                  		if (vis == "Dimmed")    { element.className = "zeroval"; } else
                 		if (vis == "Visible")   { 
					if(u[j]==Infinity){ element.className = "orangeval";}
					else { element.className = "val";}
				}
				 
                	} else if(l[j]!=-Infinity) { 
					if(u[j]==Infinity){ element.className = "orangeval";}
					else { element.className = "val";}
			} else { element.className = "zeroval"; }*/
	        
                	if (Math.abs(lb[i]) < 1e-10 ) { 
				//if(u[i]!=Infinity){
                  			if (vis == "Dimmed")    { element2.className = "zerobutvar";element2.disabled=true; } else
                  			if (vis == "Invisible") { element2.className = "graybutvar"; element2.disabled=true;} else
                  			if (vis == "Visible")   { element2.className = "butvar"; element2.disabled=true; }
				//} else {
				//	if (vis == "Dimmed")    { element2.className = "zerobutvar";  } else
                  		//	if (vis == "Invisible") { element2.className = "graybutvar";  } else
                  		//	if (vis == "Visible")   { element2.className = "butvar";  }
				//}
                	} else {element2.className = "butvar"; element2.disabled=true;}
			//else if(l[j]!=-Infinity) { 
				//	if(u[j]!=Infinity){
				//		element2.className = "butvar";  element2.disabled = false;
				//	} else { element2.className = "butvar";  element2.disabled = true;}
			//} 
 		
	        	//element = document.getElementById("minus"+(m+1)+","+j);
                	//if (!(method == "Klee-Minty" && j==1)) 
                	//if (Math.abs(l[j]) < 1e-10 || l[j]==-Infinity) { 
                  	//	if (vis == "Dimmed")    { element.className = "graysign"; } else
                  	//	if (vis == "Invisible") { element.className = "whitesign"; } else
                 	//	if (vis == "Visible")   { element.className = "sign"; }
                	//} else { element.className = "sign"; }
		//}
		
		//if(element1.className=="val" || element1.className == "zeroval" || element1.className == "whiteval"){
			/*if (Math.abs(u[j]) < 1e-10 ) { 
				if (vis == "Invisible") { element1.className = "whiteval"; } else
                  		if (vis == "Dimmed")    { element1.className = "zeroval"; } else
                 		if (vis == "Visible")   { 
					if(l[j]==-Infinity){ element1.className = "purpleval";}
					else { element1.className = "val";}
				}
				 
                	} else if(u[j]!=Infinity) { 
					if(l[j]==-Infinity){ element1.className = "purpleval";}
					else { element1.className = "val";}
			} else { element1.className = "zeroval"; }*/
	        
                	if (Math.abs(ub[i]) < 1e-10 ) { 
				//if(l[j]!=-Infinity){
                  			if (vis == "Dimmed")    { element3.className = "zerobutvar"; element3.disabled=true;} else
                  			if (vis == "Invisible") { element3.className = "graybutvar";element3.disabled=true;} else
                  			if (vis == "Visible")   { element3.className = "butvar";element3.disabled=true;}
				/*} else {
					if (vis == "Dimmed")    { element3.className = "zerobutvar"; element3.disabled = true; } else
                  			if (vis == "Invisible") { element3.className = "graybutvar"; element3.disabled = true; } else
                  			if (vis == "Visible")   { element3.className = "butvar";  element3.disabled = true;}
				}*/
                	} else {element3.className = "butvar"; element3.disabled=true;}
				 /*else if(u[j]!=Infinity) { 
					if(l[j]!=-Infinity){
						element3.className = "butvar";  element3.disabled = false;
					} else { element3.className = "butvar";  element3.disabled = true;}
			} 
 		}
	        	element = document.getElementById("minus"+(m+1)+","+j);
                	if (!(method == "Klee-Minty" && j==1)) 
                	if (Math.abs(u[j]) < 1e-10 || u[j]==Infinity) { 
                  		if (vis == "Dimmed")    { element.className = "graysign"; } else
                  		if (vis == "Invisible") { element.className = "whitesign"; } else
                 		if (vis == "Visible")   { element.className = "sign"; }
                	} else { element.className = "sign"; }
		}*/
	    //}
	//for (j=1; j<=m; j++) {
		//element = document.getElementById("lb"+j);
		element.value = myformat2(lb[i]);
		element1.value = myformat2(ub[i]);
		if (Math.abs(lb[i]) < 1e-10 ) { 
                  if (vis == "Dimmed")    { element.className = "zeroval"; } else
                  if (vis == "Invisible") { element.className = "whiteval"; } else
                  if (vis == "Visible")   { element.className = "val"; } 
                } else if (lb[i]==-Infinity ) { element.className = "zeroval"; 
                } else { element.className = "val"; }
		
		/*element = document.getElementById("lb"+j);
		element.value = myformat2(lb[j]);
		if (Math.abs(lb[i]) < 1e-10 ) { 
                  if (vis == "Dimmed")    { element.className = "zeroval"; } else
                  if (vis == "Invisible") { element.className = "whiteval"; } else
                  if (vis == "Visible")   { element.className = "val"; } 
                } else if (lb[j]==-Infinity ) { element.className = "zeroval"; 
                } else { element.className = "val"; }*/
	      
		//element = document.getElementById("ub"+j);
		//element.value = myformat2(ub[j]);
	     	if (Math.abs(ub[i]) < 1e-10 ) { 
                  if (vis == "Dimmed")    { element1.className = "zeroval"; } else
                  if (vis == "Invisible") { element1.className = "whiteval"; } else
                  if (vis == "Visible")   { element1.className = "val"; } 
                } else if (ub[i]==Infinity ) { element1.className = "zeroval";
                } else { element1.className = "val";}
	   }
	element = document.getElementById("mb"+(m+1)); 
	   	if (fmt == "Integer" && maxden != 1) { 
            		element.value = "LowerBound:   "+maxden; 
	   	} else { 
            		element.value = "LowerBound:    "; 
       	   	}
          
	   	element = document.getElementById("mb"+(m+2)); 
	   	if (fmt == "Integer" && maxden != 1) { 
            		element.value = "UpperBound:   "+maxden; 
	   	} else {
            		element.value = "UpperBound:    "; 
       	   	}

	for(i=1;i<=m;i++){
	   		element=document.getElementById("w"+i);
	   		document.getElementById("w"+i+","+(n+1)).value=element.value;
	   		document.getElementById("w"+i+","+(n+2)).value=element.value;  
	   		//document.getElementById("w"+i+","+(m+3)).disabled=true;
	   		//document.getElementById("w"+i+","+(m+4)).disabled=true;   
	}
	
	console.log("hello bob");

        element = document.getElementById("zstar"); 
	element.value = myformat2(obj);
    	console.log("obj = "+obj);
	/*if (obj == 0) { element.className = "whiteval"; } 
	else { element.className = "val"; }

	element = document.getElementById("plus"+1);
  	if (obj == 0) { element.className = "whitesign"; }*/

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
	if (fmt == "Decimal") {
	    //return sprintf("%0."+digits+"f", x);
		if(x!=Infinity && x!=-Infinity)
	     	   return Fraction(x);
		else { return x;}
		//return eval(x);
	    //return -sprintf("%0."+digits+"f", -x);
	    //return -sprintf("%10.6f", -x);
	} else {
	    return ratio;
	}
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

 /* function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
	    end = new Date().getTime();
	}
  }*/

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