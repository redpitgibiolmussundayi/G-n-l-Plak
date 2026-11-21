var Bp=0,nu=1,kp=2;var Td=1,zp=2,zi=3,Ai=0,Vt=1,ii=2,pn=0,ms=1,su=2,ru=3,au=4,vc=5,zn=100,Vp=101,Hp=102,Gp=103,Wp=104,bc=200,Mc=201,Xp=202,qp=203,ll=204,cl=205,Yp=206,jp=207,Zp=208,$p=209,Jp=210,Kp=211,Qp=212,em=213,tm=214,hl=0,ul=1,dl=2,xs=3,fl=4,pl=5,Ma=6,ml=7,wd=0,im=1,nm=2,mn=0,sm=1,rm=2,am=3,om=4,lm=5,cm=6,hm=7,ou="attached",um="detached",Ed=300,vs=301,bs=302,gl=303,yl=304,ja=306,Hn=1e3,Vi=1001,ar=1002,Ct=1003,Sc=1004;var fs=1005;var Ot=1006,ir=1007;var Ei=1008;var xi=1009,Ad=1010,Cd=1011,or=1012,Tc=1013,Gn=1014,ni=1015,_r=1016,wc=1017,Ec=1018,Ms=1020,Rd=35902,Pd=1021,Id=1022,si=1023,Ld=1024,Dd=1025,gs=1026,Ss=1027,Za=1028,Ac=1029,$a=1030,Cc=1031;var Ja=1033,ya=33776,_a=33777,xa=33778,va=33779,_l=35840,xl=35841,vl=35842,bl=35843,Ml=36196,Sl=37492,Tl=37496,wl=37808,El=37809,Al=37810,Cl=37811,Rl=37812,Pl=37813,Il=37814,Ll=37815,Dl=37816,Ul=37817,Nl=37818,Ol=37819,Fl=37820,Bl=37821,ba=36492,kl=36494,zl=36495,Ud=36283,Vl=36284,Hl=36285,Gl=36286;var Ts=2300,ws=2301,Po=2302,lu=2400,cu=2401,hu=2402,dm=2500;var Nd=0,Ka=1,xr=2,fm=3200,pm=3201;var Od=0,mm=1,un="",rt="srgb",Tt="srgb-linear",Qa="linear",Qe="srgb";var Kn=7680;var uu=519,gm=512,ym=513,_m=514,Fd=515,xm=516,vm=517,bm=518,Mm=519,Wl=35044;var du="300 es",Hi=2e3,Sa=2001,Ht=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fu=1234567,nr=Math.PI/180,Es=180/Math.PI;function _i(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]).toLowerCase()}function Et(i,e,t){return Math.max(e,Math.min(t,i))}function Rc(i,e){return(i%e+e)%e}function Sm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Tm(i,e,t){return i!==e?(t-i)/(e-i):0}function sr(i,e,t){return(1-t)*i+t*e}function wm(i,e,t,n){return sr(i,e,1-Math.exp(-t*n))}function Em(i,e=1){return e-Math.abs(Rc(i,e*2)-e)}function Am(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Cm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Rm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Pm(i,e){return i+Math.random()*(e-i)}function Im(i){return i*(.5-Math.random())}function Lm(i){i!==void 0&&(fu=i);let e=fu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Dm(i){return i*nr}function Um(i){return i*Es}function Nm(i){return(i&i-1)===0&&i!==0}function Om(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Fm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Bm(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ke(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ns={DEG2RAD:nr,RAD2DEG:Es,generateUUID:_i,clamp:Et,euclideanModulo:Rc,mapLinear:Sm,inverseLerp:Tm,lerp:sr,damp:wm,pingpong:Em,smoothstep:Am,smootherstep:Cm,randInt:Rm,randFloat:Pm,randFloatSpread:Im,seededRandom:Lm,degToRad:Dm,radToDeg:Um,isPowerOfTwo:Nm,ceilPowerOfTwo:Om,floorPowerOfTwo:Fm,setQuaternionFromProperEuler:Bm,normalize:Ke,denormalize:yi},ve=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Pe=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],T=s[1],x=s[4],v=s[7],P=s[2],E=s[5],A=s[8];return r[0]=a*y+o*T+l*P,r[3]=a*g+o*x+l*E,r[6]=a*p+o*v+l*A,r[1]=c*y+h*T+u*P,r[4]=c*g+h*x+u*E,r[7]=c*p+h*v+u*A,r[2]=d*y+f*T+m*P,r[5]=d*g+f*x+m*E,r[8]=d*p+f*v+m*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,m=t*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=u*y,e[1]=(s*c-h*n)*y,e[2]=(o*n-s*a)*y,e[3]=d*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Io.makeScale(e,t)),this}rotate(e){return this.premultiply(Io.makeRotation(-e)),this}translate(e,t){return this.premultiply(Io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Io=new Pe;function Bd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function km(){let i=lr("canvas");return i.style.display="block",i}var pu={};function er(i){i in pu||(pu[i]=!0,console.warn(i))}function zm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Vm(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Hm(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var Fe={enabled:!0,workingColorSpace:Tt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Qe&&(i.r=Gi(i.r),i.g=Gi(i.g),i.b=Gi(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Qe&&(i.r=ys(i.r),i.g=ys(i.g),i.b=ys(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===un?Qa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var mu=[.64,.33,.3,.6,.15,.06],gu=[.2126,.7152,.0722],yu=[.3127,.329],_u=new Pe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xu=new Pe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Fe.define({[Tt]:{primaries:mu,whitePoint:yu,transfer:Qa,toXYZ:_u,fromXYZ:xu,luminanceCoefficients:gu,workingColorSpaceConfig:{unpackColorSpace:rt},outputColorSpaceConfig:{drawingBufferColorSpace:rt}},[rt]:{primaries:mu,whitePoint:yu,transfer:Qe,toXYZ:_u,fromXYZ:xu,luminanceCoefficients:gu,outputColorSpaceConfig:{drawingBufferColorSpace:rt}}});var Qn,Xl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qn===void 0&&(Qn=lr("canvas")),Qn.width=e.width,Qn.height=e.height;let n=Qn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=lr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Gi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Gi(t[n]/255)*255):t[n]=Gi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Gm=0,cr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=_i(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Lo(s[a].image)):r.push(Lo(s[a]))}else r=Lo(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Lo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Wm=0,yt=class i extends Ht{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Vi,s=Vi,r=Ot,a=Ei,o=si,l=xi,c=i.DEFAULT_ANISOTROPY,h=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=_i(),this.name="",this.source=new cr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ed)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Hn:e.x=e.x-Math.floor(e.x);break;case Vi:e.x=e.x<0?0:1;break;case ar:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Hn:e.y=e.y-Math.floor(e.y);break;case Vi:e.y=e.y<0?0:1;break;case ar:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=Ed;yt.DEFAULT_ANISOTROPY=1;var qe=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,v=(f+1)/2,P=(p+1)/2,E=(h+d)/4,A=(u+y)/4,R=(m+g)/4;return x>v&&x>P?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=E/n,r=A/n):v>P?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=E/s,r=R/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=A/r,s=R/r),this.set(n,s,r,t),this}let T=Math.sqrt((g-m)*(g-m)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(g-m)/T,this.y=(u-y)/T,this.z=(d-h)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ql=class extends Ht{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new qe(0,0,e,t),this.scissorTest=!1,this.viewport=new qe(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new yt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new cr(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ri=class extends ql{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ta=class extends yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Yl=class extends yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],m=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=y;return}if(u!==y||l!==d||c!==f||h!==m){let g=1-o,p=l*d+c*f+h*m+u*y,T=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let P=Math.sqrt(x),E=Math.atan2(P,p*T);g=Math.sin(g*E)/P,o=Math.sin(o*E)/P}let v=o*T;if(l=l*g+d*v,c=c*g+f*v,h=h*g+m*v,u=u*g+y*v,g===1-o){let P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-o*f,e[t+2]=c*m+h*f+o*d-l*u,e[t+3]=h*m-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Do.copy(this).projectOnVector(e),this.sub(Do)}reflect(e){return this.sub(Do.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Do=new C,vu=new Rt,Dt=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,fi):fi.fromBufferAttribute(r,a),fi.applyMatrix4(e.matrixWorld),this.expandByPoint(fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Wr.copy(n.boundingBox)),Wr.applyMatrix4(e.matrixWorld),this.union(Wr)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fi),fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),Xr.subVectors(this.max,qs),es.subVectors(e.a,qs),ts.subVectors(e.b,qs),is.subVectors(e.c,qs),rn.subVectors(ts,es),an.subVectors(is,ts),Dn.subVectors(es,is);let t=[0,-rn.z,rn.y,0,-an.z,an.y,0,-Dn.z,Dn.y,rn.z,0,-rn.x,an.z,0,-an.x,Dn.z,0,-Dn.x,-rn.y,rn.x,0,-an.y,an.x,0,-Dn.y,Dn.x,0];return!Uo(t,es,ts,is,Xr)||(t=[1,0,0,0,1,0,0,0,1],!Uo(t,es,ts,is,Xr))?!1:(qr.crossVectors(rn,an),t=[qr.x,qr.y,qr.z],Uo(t,es,ts,is,Xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Ui=[new C,new C,new C,new C,new C,new C,new C,new C],fi=new C,Wr=new Dt,es=new C,ts=new C,is=new C,rn=new C,an=new C,Dn=new C,qs=new C,Xr=new C,qr=new C,Un=new C;function Uo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Un.fromArray(i,r);let o=s.x*Math.abs(Un.x)+s.y*Math.abs(Un.y)+s.z*Math.abs(Un.z),l=e.dot(Un),c=t.dot(Un),h=n.dot(Un);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Xm=new Dt,Ys=new C,No=new C,St=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Xm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ys.subVectors(e,this.center);let t=Ys.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ys,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(No.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ys.copy(e.center).add(No)),this.expandByPoint(Ys.copy(e.center).sub(No))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ni=new C,Oo=new C,Yr=new C,on=new C,Fo=new C,jr=new C,Bo=new C,ai=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,t),Ni.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Oo.copy(e).add(t).multiplyScalar(.5),Yr.copy(t).sub(e).normalize(),on.copy(this.origin).sub(Oo);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Yr),o=on.dot(this.direction),l=-on.dot(Yr),c=on.lengthSq(),h=Math.abs(1-a*a),u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=r*h,u>=0)if(d>=-m)if(d<=m){let y=1/h;u*=y,d*=y,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Oo).addScaledVector(Yr,d),f}intersectSphere(e,t){Ni.subVectors(e.center,this.origin);let n=Ni.dot(this.direction),s=Ni.dot(Ni)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,t,n,s,r){Fo.subVectors(t,e),jr.subVectors(n,e),Bo.crossVectors(Fo,jr);let a=this.direction.dot(Bo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;on.subVectors(this.origin,e);let l=o*this.direction.dot(jr.crossVectors(on,jr));if(l<0)return null;let c=o*this.direction.dot(Fo.cross(on));if(c<0||l+c>a)return null;let h=-o*on.dot(Bo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ce=class i{constructor(e,t,n,s,r,a,o,l,c,h,u,d,f,m,y,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,d,f,m,y,g)}set(e,t,n,s,r,a,o,l,c,h,u,d,f,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,m=o*h,y=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-y*c,t[9]=-o*l,t[2]=y-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,m=c*h,y=c*u;t[0]=d+y*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=y+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,m=c*h,y=c*u;t[0]=d-y*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=y-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,m=o*h,y=o*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+y,t[1]=l*u,t[5]=y*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*h,t[4]=y-d*u,t[8]=m*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-y*u}else if(e.order==="XZY"){let d=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+y,t[5]=a*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qm,e,Ym)}lookAt(e,t,n){let s=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),ln.crossVectors(n,Yt),ln.lengthSq()===0&&(Math.abs(n.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),ln.crossVectors(n,Yt)),ln.normalize(),Zr.crossVectors(Yt,ln),s[0]=ln.x,s[4]=Zr.x,s[8]=Yt.x,s[1]=ln.y,s[5]=Zr.y,s[9]=Yt.y,s[2]=ln.z,s[6]=Zr.z,s[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],T=n[3],x=n[7],v=n[11],P=n[15],E=s[0],A=s[4],R=s[8],S=s[12],M=s[1],I=s[5],W=s[9],O=s[13],G=s[2],$=s[6],V=s[10],K=s[14],H=s[3],ne=s[7],he=s[11],Me=s[15];return r[0]=a*E+o*M+l*G+c*H,r[4]=a*A+o*I+l*$+c*ne,r[8]=a*R+o*W+l*V+c*he,r[12]=a*S+o*O+l*K+c*Me,r[1]=h*E+u*M+d*G+f*H,r[5]=h*A+u*I+d*$+f*ne,r[9]=h*R+u*W+d*V+f*he,r[13]=h*S+u*O+d*K+f*Me,r[2]=m*E+y*M+g*G+p*H,r[6]=m*A+y*I+g*$+p*ne,r[10]=m*R+y*W+g*V+p*he,r[14]=m*S+y*O+g*K+p*Me,r[3]=T*E+x*M+v*G+P*H,r[7]=T*A+x*I+v*$+P*ne,r[11]=T*R+x*W+v*V+P*he,r[15]=T*S+x*O+v*K+P*Me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15];return m*(+r*l*u-s*c*u-r*o*d+n*c*d+s*o*f-n*l*f)+y*(+t*l*f-t*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+g*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-s*o*h-t*l*u+t*o*d+s*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],T=u*g*c-y*d*c+y*l*f-o*g*f-u*l*p+o*d*p,x=m*d*c-h*g*c-m*l*f+a*g*f+h*l*p-a*d*p,v=h*y*c-m*u*c+m*o*f-a*y*f-h*o*p+a*u*p,P=m*u*l-h*y*l-m*o*d+a*y*d+h*o*g-a*u*g,E=t*T+n*x+s*v+r*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return e[0]=T*A,e[1]=(y*d*r-u*g*r-y*s*f+n*g*f+u*s*p-n*d*p)*A,e[2]=(o*g*r-y*l*r+y*s*c-n*g*c-o*s*p+n*l*p)*A,e[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*f-n*l*f)*A,e[4]=x*A,e[5]=(h*g*r-m*d*r+m*s*f-t*g*f-h*s*p+t*d*p)*A,e[6]=(m*l*r-a*g*r-m*s*c+t*g*c+a*s*p-t*l*p)*A,e[7]=(a*d*r-h*l*r+h*s*c-t*d*c-a*s*f+t*l*f)*A,e[8]=v*A,e[9]=(m*u*r-h*y*r-m*n*f+t*y*f+h*n*p-t*u*p)*A,e[10]=(a*y*r-m*o*r+m*n*c-t*y*c-a*n*p+t*o*p)*A,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*f-t*o*f)*A,e[12]=P*A,e[13]=(h*y*s-m*u*s+m*n*d-t*y*d-h*n*g+t*u*g)*A,e[14]=(m*o*s-a*y*s-m*n*l+t*y*l+a*n*g-t*o*g)*A,e[15]=(a*u*s-h*o*s+h*n*l-t*u*l-a*n*d+t*o*d)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,m=r*u,y=a*h,g=a*u,p=o*u,T=l*c,x=l*h,v=l*u,P=n.x,E=n.y,A=n.z;return s[0]=(1-(y+p))*P,s[1]=(f+v)*P,s[2]=(m-x)*P,s[3]=0,s[4]=(f-v)*E,s[5]=(1-(d+p))*E,s[6]=(g+T)*E,s[7]=0,s[8]=(m+x)*A,s[9]=(g-T)*A,s[10]=(1-(d+y))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=ns.set(s[0],s[1],s[2]).length(),a=ns.set(s[4],s[5],s[6]).length(),o=ns.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],pi.copy(this);let c=1/r,h=1/a,u=1/o;return pi.elements[0]*=c,pi.elements[1]*=c,pi.elements[2]*=c,pi.elements[4]*=h,pi.elements[5]*=h,pi.elements[6]*=h,pi.elements[8]*=u,pi.elements[9]*=u,pi.elements[10]*=u,t.setFromRotationMatrix(pi),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Hi){let l=this.elements,c=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s),f,m;if(o===Hi)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===Sa)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Hi){let l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(a-r),d=(t+e)*c,f=(n+s)*h,m,y;if(o===Hi)m=(a+r)*u,y=-2*u;else if(o===Sa)m=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=y,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ns=new C,pi=new ce,qm=new C(0,0,0),Ym=new C(1,1,1),ln=new C,Zr=new C,Yt=new C,bu=new ce,Mu=new Rt,oi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return bu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mu.setFromEuler(this),this.setFromQuaternion(Mu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};oi.DEFAULT_ORDER="XYZ";var hr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},jm=0,Su=new C,ss=new Rt,Oi=new ce,$r=new C,js=new C,Zm=new C,$m=new Rt,Tu=new C(1,0,0),wu=new C(0,1,0),Eu=new C(0,0,1),Au={type:"added"},Jm={type:"removed"},rs={type:"childadded",child:null},ko={type:"childremoved",child:null},ut=class i extends Ht{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=_i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new oi,n=new Rt,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new Pe}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(Tu,e)}rotateY(e){return this.rotateOnAxis(wu,e)}rotateZ(e){return this.rotateOnAxis(Eu,e)}translateOnAxis(e,t){return Su.copy(e).applyQuaternion(this.quaternion),this.position.add(Su.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tu,e)}translateY(e){return this.translateOnAxis(wu,e)}translateZ(e){return this.translateOnAxis(Eu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$r.copy(e):$r.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(js,$r,this.up):Oi.lookAt($r,js,this.up),this.quaternion.setFromRotationMatrix(Oi),s&&(Oi.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(Oi),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Au),rs.child=e,this.dispatchEvent(rs),rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jm),ko.child=e,this.dispatchEvent(ko),ko.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Au),rs.child=e,this.dispatchEvent(rs),rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e,Zm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,$m,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};ut.DEFAULT_UP=new C(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mi=new C,Fi=new C,zo=new C,Bi=new C,as=new C,os=new C,Cu=new C,Vo=new C,Ho=new C,Go=new C,Wo=new qe,Xo=new qe,qo=new qe,dn=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),mi.subVectors(e,t),s.cross(mi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){mi.subVectors(s,t),Fi.subVectors(n,t),zo.subVectors(e,t);let a=mi.dot(mi),o=mi.dot(Fi),l=mi.dot(zo),c=Fi.dot(Fi),h=Fi.dot(zo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bi.x),l.addScaledVector(a,Bi.y),l.addScaledVector(o,Bi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Wo.setScalar(0),Xo.setScalar(0),qo.setScalar(0),Wo.fromBufferAttribute(e,t),Xo.fromBufferAttribute(e,n),qo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Wo,r.x),a.addScaledVector(Xo,r.y),a.addScaledVector(qo,r.z),a}static isFrontFacing(e,t,n,s){return mi.subVectors(n,t),Fi.subVectors(e,t),mi.cross(Fi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mi.subVectors(this.c,this.b),Fi.subVectors(this.a,this.b),mi.cross(Fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;as.subVectors(s,n),os.subVectors(r,n),Vo.subVectors(e,n);let l=as.dot(Vo),c=os.dot(Vo);if(l<=0&&c<=0)return t.copy(n);Ho.subVectors(e,s);let h=as.dot(Ho),u=os.dot(Ho);if(h>=0&&u<=h)return t.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(as,a);Go.subVectors(e,r);let f=as.dot(Go),m=os.dot(Go);if(m>=0&&f<=m)return t.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(os,o);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Cu.subVectors(r,s),o=(u-h)/(u-h+(f-m)),t.copy(s).addScaledVector(Cu,o);let p=1/(g+y+d);return a=y*p,o=d*p,t.copy(n).addScaledVector(as,a).addScaledVector(os,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cn={h:0,s:0,l:0},Jr={h:0,s:0,l:0};function Yo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Se=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Fe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Fe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Fe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Fe.workingColorSpace){if(e=Rc(e,1),t=Et(t,0,1),n=Et(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Yo(a,r,e+1/3),this.g=Yo(a,r,e),this.b=Yo(a,r,e-1/3)}return Fe.toWorkingColorSpace(this,s),this}setStyle(e,t=rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rt){let n=kd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}copyLinearToSRGB(e){return this.r=ys(e.r),this.g=ys(e.g),this.b=ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rt){return Fe.fromWorkingColorSpace(Lt.copy(this),e),Math.round(Et(Lt.r*255,0,255))*65536+Math.round(Et(Lt.g*255,0,255))*256+Math.round(Et(Lt.b*255,0,255))}getHexString(e=rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Fe.workingColorSpace){Fe.fromWorkingColorSpace(Lt.copy(this),t);let n=Lt.r,s=Lt.g,r=Lt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Fe.workingColorSpace){return Fe.fromWorkingColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=rt){Fe.fromWorkingColorSpace(Lt.copy(this),e);let t=Lt.r,n=Lt.g,s=Lt.b;return e!==rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(cn),this.setHSL(cn.h+e,cn.s+t,cn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(cn),e.getHSL(Jr);let n=sr(cn.h,Jr.h,t),s=sr(cn.s,Jr.s,t),r=sr(cn.l,Jr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Lt=new Se;Se.NAMES=kd;var Km=0,Zt=class extends Ht{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=_i(),this.name="",this.blending=ms,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ll,this.blendDst=cl,this.blendEquation=zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kn,this.stencilZFail=Kn,this.stencilZPass=Kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ms&&(n.blending=this.blending),this.side!==Ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ll&&(n.blendSrc=this.blendSrc),this.blendDst!==cl&&(n.blendDst=this.blendDst),this.blendEquation!==zn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Kn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Kn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},$t=class extends Zt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=wd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var mt=new C,Kr=new ve,je=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Wl,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Kr.fromBufferAttribute(this,t),Kr.applyMatrix3(e),this.setXY(t,Kr.x,Kr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wl&&(e.usage=this.usage),e}};var wa=class extends je{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ea=class extends je{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ft=class extends je{constructor(e,t,n){super(new Float32Array(e),t,n)}},Qm=0,ti=new ce,jo=new ut,ls=new C,jt=new Dt,Zs=new Dt,Mt=new C,_t=class i extends Ht{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=_i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bd(e)?Ea:wa)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Pe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,n){return ti.makeTranslation(e,t,n),this.applyMatrix4(ti),this}scale(e,t,n){return ti.makeScale(e,t,n),this.applyMatrix4(ti),this}lookAt(e){return jo.lookAt(e),jo.updateMatrix(),this.applyMatrix4(jo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ft(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];jt.setFromBufferAttribute(r),this.morphTargetsRelative?(Mt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Mt),Mt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Mt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new St);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Zs.setFromBufferAttribute(o),this.morphTargetsRelative?(Mt.addVectors(jt.min,Zs.min),jt.expandByPoint(Mt),Mt.addVectors(jt.max,Zs.max),jt.expandByPoint(Mt)):(jt.expandByPoint(Zs.min),jt.expandByPoint(Zs.max))}jt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Mt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Mt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Mt.fromBufferAttribute(o,c),l&&(ls.fromBufferAttribute(e,c),Mt.add(ls)),s=Math.max(s,n.distanceToSquared(Mt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new C,l[R]=new C;let c=new C,h=new C,u=new C,d=new ve,f=new ve,m=new ve,y=new C,g=new C;function p(R,S,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);let I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(I),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),o[R].add(y),o[S].add(y),o[M].add(y),l[R].add(g),l[S].add(g),l[M].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let R=0,S=T.length;R<S;++R){let M=T[R],I=M.start,W=M.count;for(let O=I,G=I+W;O<G;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let x=new C,v=new C,P=new C,E=new C;function A(R){P.fromBufferAttribute(s,R),E.copy(P);let S=o[R];x.copy(S),x.sub(P.multiplyScalar(P.dot(S))).normalize(),v.crossVectors(E,S);let I=v.dot(l[R])<0?-1:1;a.setXYZW(R,x.x,x.y,x.z,I)}for(let R=0,S=T.length;R<S;++R){let M=T[R],I=M.start,W=M.count;for(let O=I,G=I+W;O<G;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),y=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mt.fromBufferAttribute(e,t),Mt.normalize(),e.setXYZ(t,Mt.x,Mt.y,Mt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new je(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ru=new ce,Nn=new ai,Qr=new St,Pu=new C,ea=new C,ta=new C,ia=new C,Zo=new C,na=new C,Iu=new C,sa=new C,ct=class extends ut{constructor(e=new _t,t=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Zo.fromBufferAttribute(u,e),a?na.addScaledVector(Zo,h):na.addScaledVector(Zo.sub(t),h))}t.add(na)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(r),Nn.copy(e.ray).recast(e.near),!(Qr.containsPoint(Nn.origin)===!1&&(Nn.intersectSphere(Qr,Pu)===null||Nn.origin.distanceToSquared(Pu)>(e.far-e.near)**2))&&(Ru.copy(r).invert(),Nn.copy(e.ray).applyMatrix4(Ru),!(n.boundingBox!==null&&Nn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Nn)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],T=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=T,P=x;v<P;v+=3){let E=o.getX(v),A=o.getX(v+1),R=o.getX(v+2);s=ra(this,p,e,n,c,h,u,E,A,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let T=o.getX(g),x=o.getX(g+1),v=o.getX(g+2);s=ra(this,a,e,n,c,h,u,T,x,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],T=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=T,P=x;v<P;v+=3){let E=v,A=v+1,R=v+2;s=ra(this,p,e,n,c,h,u,E,A,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let T=g,x=g+1,v=g+2;s=ra(this,a,e,n,c,h,u,T,x,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function eg(i,e,t,n,s,r,a,o){let l;if(e.side===Vt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Ai,o),l===null)return null;sa.copy(o),sa.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(sa);return c<t.near||c>t.far?null:{distance:c,point:sa.clone(),object:i}}function ra(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ea),i.getVertexPosition(l,ta),i.getVertexPosition(c,ia);let h=eg(i,e,t,n,ea,ta,ia,Iu);if(h){let u=new C;dn.getBarycoord(Iu,ea,ta,ia,u),s&&(h.uv=dn.getInterpolatedAttribute(s,o,l,c,u,new ve)),r&&(h.uv1=dn.getInterpolatedAttribute(r,o,l,c,u,new ve)),a&&(h.normal=dn.getInterpolatedAttribute(a,o,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new C,materialIndex:0};dn.getNormal(ea,ta,ia,d.normal),h.face=d,h.barycoord=u}return h}var Wi=class i extends _t{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(h,3)),this.setAttribute("uv",new Ft(u,2));function m(y,g,p,T,x,v,P,E,A,R,S){let M=v/A,I=P/R,W=v/2,O=P/2,G=E/2,$=A+1,V=R+1,K=0,H=0,ne=new C;for(let he=0;he<V;he++){let Me=he*I-O;for(let Be=0;Be<$;Be++){let et=Be*M-W;ne[y]=et*T,ne[g]=Me*x,ne[p]=G,c.push(ne.x,ne.y,ne.z),ne[y]=0,ne[g]=0,ne[p]=E>0?1:-1,h.push(ne.x,ne.y,ne.z),u.push(Be/A),u.push(1-he/R),K+=1}}for(let he=0;he<R;he++)for(let Me=0;Me<A;Me++){let Be=d+Me+$*he,et=d+Me+$*(he+1),q=d+(Me+1)+$*(he+1),ee=d+(Me+1)+$*he;l.push(Be,et,ee),l.push(et,q,ee),H+=6}o.addGroup(f,H,S),f+=H,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function As(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Nt(i){let e={};for(let t=0;t<i.length;t++){let n=As(i[t]);for(let s in n)e[s]=n[s]}return e}function tg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function zd(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Fe.workingColorSpace}var ig={clone:As,merge:Nt},ng=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jt=class extends Zt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ng,this.fragmentShader=sg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=tg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Aa=class extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=Hi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},hn=new C,Lu=new ve,Du=new ve,gt=class extends Aa{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Es*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(nr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Es*2*Math.atan(Math.tan(nr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hn.x,hn.y).multiplyScalar(-e/hn.z),hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hn.x,hn.y).multiplyScalar(-e/hn.z)}getViewSize(e,t){return this.getViewBounds(e,Lu,Du),t.subVectors(Du,Lu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(nr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},cs=-90,hs=1,jl=class extends ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new gt(cs,hs,e,t);s.layers=this.layers,this.add(s);let r=new gt(cs,hs,e,t);r.layers=this.layers,this.add(r);let a=new gt(cs,hs,e,t);a.layers=this.layers,this.add(a);let o=new gt(cs,hs,e,t);o.layers=this.layers,this.add(o);let l=new gt(cs,hs,e,t);l.layers=this.layers,this.add(l);let c=new gt(cs,hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Hi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Sa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ca=class extends yt{constructor(e,t,n,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:vs,super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Zl=class extends ri{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ca(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ot}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Wi(5,5,5),r=new Jt({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:pn});r.uniforms.tEquirect.value=t;let a=new ct(s,r),o=t.minFilter;return t.minFilter===Ei&&(t.minFilter=Ot),new jl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},$o=new C,rg=new C,ag=new Pe,gi=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=$o.subVectors(n,t).cross(rg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta($o),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ag.getNormalMatrix(e),s=this.coplanarPoint($o).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},On=new St,aa=new C,gn=class{constructor(e=new gi,t=new gi,n=new gi,s=new gi,r=new gi,a=new gi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Hi){let n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],m=s[9],y=s[10],g=s[11],p=s[12],T=s[13],x=s[14],v=s[15];if(n[0].setComponents(l-r,d-c,g-f,v-p).normalize(),n[1].setComponents(l+r,d+c,g+f,v+p).normalize(),n[2].setComponents(l+a,d+h,g+m,v+T).normalize(),n[3].setComponents(l-a,d-h,g-m,v-T).normalize(),n[4].setComponents(l-o,d-u,g-y,v-x).normalize(),t===Hi)n[5].setComponents(l+o,d+u,g+y,v+x).normalize();else if(t===Sa)n[5].setComponents(o,u,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(e){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(e.matrixWorld),this.intersectsSphere(On)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(aa.x=s.normal.x>0?e.max.x:e.min.x,aa.y=s.normal.y>0?e.max.y:e.min.y,aa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(aa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Vd(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function og(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],y=u[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let y=u[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var yn=class i extends _t{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let T=p*d-a;for(let x=0;x<c;x++){let v=x*u-r;m.push(v,-T,0),y.push(0,0,1),g.push(x/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){let x=T+c*p,v=T+c*(p+1),P=T+1+c*(p+1),E=T+1+c*p;f.push(x,v,E),f.push(v,P,E)}this.setIndex(f),this.setAttribute("position",new Ft(m,3)),this.setAttribute("normal",new Ft(y,3)),this.setAttribute("uv",new Ft(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},lg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ug=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,mg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_g=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Mg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ag=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Pg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ig=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Dg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ng=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Og=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bg="gl_FragColor = linearToOutputTexel( gl_FragColor );",kg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Xg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$g=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ey=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ty=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ny=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ry=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ay=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,oy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ly=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,py=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,my=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_y=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,by=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,My=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ty=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ey=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ay=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ry=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Py=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Iy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ly=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Uy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ny=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Oy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,By=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ky=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Wy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Xy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$y=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Jy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ky=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,e_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,t_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,i_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,n_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,s_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,r_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,a_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,o_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,l_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,p_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,m_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,g_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,y_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,__=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,v_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,M_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,E_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,C_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,R_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,L_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,O_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,k_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,z_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:lg,alphahash_pars_fragment:cg,alphamap_fragment:hg,alphamap_pars_fragment:ug,alphatest_fragment:dg,alphatest_pars_fragment:fg,aomap_fragment:pg,aomap_pars_fragment:mg,batching_pars_vertex:gg,batching_vertex:yg,begin_vertex:_g,beginnormal_vertex:xg,bsdfs:vg,iridescence_fragment:bg,bumpmap_pars_fragment:Mg,clipping_planes_fragment:Sg,clipping_planes_pars_fragment:Tg,clipping_planes_pars_vertex:wg,clipping_planes_vertex:Eg,color_fragment:Ag,color_pars_fragment:Cg,color_pars_vertex:Rg,color_vertex:Pg,common:Ig,cube_uv_reflection_fragment:Lg,defaultnormal_vertex:Dg,displacementmap_pars_vertex:Ug,displacementmap_vertex:Ng,emissivemap_fragment:Og,emissivemap_pars_fragment:Fg,colorspace_fragment:Bg,colorspace_pars_fragment:kg,envmap_fragment:zg,envmap_common_pars_fragment:Vg,envmap_pars_fragment:Hg,envmap_pars_vertex:Gg,envmap_physical_pars_fragment:ey,envmap_vertex:Wg,fog_vertex:Xg,fog_pars_vertex:qg,fog_fragment:Yg,fog_pars_fragment:jg,gradientmap_pars_fragment:Zg,lightmap_pars_fragment:$g,lights_lambert_fragment:Jg,lights_lambert_pars_fragment:Kg,lights_pars_begin:Qg,lights_toon_fragment:ty,lights_toon_pars_fragment:iy,lights_phong_fragment:ny,lights_phong_pars_fragment:sy,lights_physical_fragment:ry,lights_physical_pars_fragment:ay,lights_fragment_begin:oy,lights_fragment_maps:ly,lights_fragment_end:cy,logdepthbuf_fragment:hy,logdepthbuf_pars_fragment:uy,logdepthbuf_pars_vertex:dy,logdepthbuf_vertex:fy,map_fragment:py,map_pars_fragment:my,map_particle_fragment:gy,map_particle_pars_fragment:yy,metalnessmap_fragment:_y,metalnessmap_pars_fragment:xy,morphinstance_vertex:vy,morphcolor_vertex:by,morphnormal_vertex:My,morphtarget_pars_vertex:Sy,morphtarget_vertex:Ty,normal_fragment_begin:wy,normal_fragment_maps:Ey,normal_pars_fragment:Ay,normal_pars_vertex:Cy,normal_vertex:Ry,normalmap_pars_fragment:Py,clearcoat_normal_fragment_begin:Iy,clearcoat_normal_fragment_maps:Ly,clearcoat_pars_fragment:Dy,iridescence_pars_fragment:Uy,opaque_fragment:Ny,packing:Oy,premultiplied_alpha_fragment:Fy,project_vertex:By,dithering_fragment:ky,dithering_pars_fragment:zy,roughnessmap_fragment:Vy,roughnessmap_pars_fragment:Hy,shadowmap_pars_fragment:Gy,shadowmap_pars_vertex:Wy,shadowmap_vertex:Xy,shadowmask_pars_fragment:qy,skinbase_vertex:Yy,skinning_pars_vertex:jy,skinning_vertex:Zy,skinnormal_vertex:$y,specularmap_fragment:Jy,specularmap_pars_fragment:Ky,tonemapping_fragment:Qy,tonemapping_pars_fragment:e_,transmission_fragment:t_,transmission_pars_fragment:i_,uv_pars_fragment:n_,uv_pars_vertex:s_,uv_vertex:r_,worldpos_vertex:a_,background_vert:o_,background_frag:l_,backgroundCube_vert:c_,backgroundCube_frag:h_,cube_vert:u_,cube_frag:d_,depth_vert:f_,depth_frag:p_,distanceRGBA_vert:m_,distanceRGBA_frag:g_,equirect_vert:y_,equirect_frag:__,linedashed_vert:x_,linedashed_frag:v_,meshbasic_vert:b_,meshbasic_frag:M_,meshlambert_vert:S_,meshlambert_frag:T_,meshmatcap_vert:w_,meshmatcap_frag:E_,meshnormal_vert:A_,meshnormal_frag:C_,meshphong_vert:R_,meshphong_frag:P_,meshphysical_vert:I_,meshphysical_frag:L_,meshtoon_vert:D_,meshtoon_frag:U_,points_vert:N_,points_frag:O_,shadow_vert:F_,shadow_frag:B_,sprite_vert:k_,sprite_frag:z_},te={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pe},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pe}},envmap:{envMap:{value:null},envMapRotation:{value:new Pe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pe},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0},uvTransform:{value:new Pe}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pe},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0}}},wi={basic:{uniforms:Nt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Nt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Se(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Nt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Nt([te.common,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.roughnessmap,te.metalnessmap,te.fog,te.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Nt([te.common,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.gradientmap,te.fog,te.lights,{emissive:{value:new Se(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Nt([te.common,te.bumpmap,te.normalmap,te.displacementmap,te.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Nt([te.points,te.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Nt([te.common,te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Nt([te.common,te.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Nt([te.common,te.bumpmap,te.normalmap,te.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Nt([te.sprite,te.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Pe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pe}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:Nt([te.common,te.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:Nt([te.lights,te.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};wi.physical={uniforms:Nt([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pe},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pe},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pe},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pe},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pe},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pe}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};var oa={r:0,b:0,g:0},Fn=new oi,V_=new ce;function H_(i,e,t,n,s,r,a){let o=new Se(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?t:e).get(x)),x}function y(T){let x=!1,v=m(T);v===null?p(o,l):v&&v.isColor&&(p(v,1),x=!0);let P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(T,x){let v=m(x);v&&(v.isCubeTexture||v.mapping===ja)?(h===void 0&&(h=new ct(new Wi(1,1,1),new Jt({name:"BackgroundCubeMaterial",uniforms:As(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Fn.copy(x.backgroundRotation),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(V_.makeRotationFromEuler(Fn)),h.material.toneMapped=Fe.getTransfer(v.colorSpace)!==Qe,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ct(new yn(2,2),new Jt({name:"BackgroundMaterial",uniforms:As(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Fe.getTransfer(v.colorSpace)!==Qe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,x){T.getRGB(oa,zd(i)),n.buffers.color.setClear(oa.r,oa.g,oa.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(T,x=1){o.set(T),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(o,l)},render:y,addToRenderList:g}}function G_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(M,I,W,O,G){let $=!1,V=u(O,W,I);r!==V&&(r=V,c(r.object)),$=f(M,O,W,G),$&&m(M,O,W,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,v(M,I,W,O),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,I,W){let O=W.wireframe===!0,G=n[M.id];G===void 0&&(G={},n[M.id]=G);let $=G[I.id];$===void 0&&($={},G[I.id]=$);let V=$[O];return V===void 0&&(V=d(l()),$[O]=V),V}function d(M){let I=[],W=[],O=[];for(let G=0;G<t;G++)I[G]=0,W[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:W,attributeDivisors:O,object:M,attributes:{},index:null}}function f(M,I,W,O){let G=r.attributes,$=I.attributes,V=0,K=W.getAttributes();for(let H in K)if(K[H].location>=0){let he=G[H],Me=$[H];if(Me===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(Me=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(Me=M.instanceColor)),he===void 0||he.attribute!==Me||Me&&he.data!==Me.data)return!0;V++}return r.attributesNum!==V||r.index!==O}function m(M,I,W,O){let G={},$=I.attributes,V=0,K=W.getAttributes();for(let H in K)if(K[H].location>=0){let he=$[H];he===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(he=M.instanceColor));let Me={};Me.attribute=he,he&&he.data&&(Me.data=he.data),G[H]=Me,V++}r.attributes=G,r.attributesNum=V,r.index=O}function y(){let M=r.newAttributes;for(let I=0,W=M.length;I<W;I++)M[I]=0}function g(M){p(M,0)}function p(M,I){let W=r.newAttributes,O=r.enabledAttributes,G=r.attributeDivisors;W[M]=1,O[M]===0&&(i.enableVertexAttribArray(M),O[M]=1),G[M]!==I&&(i.vertexAttribDivisor(M,I),G[M]=I)}function T(){let M=r.newAttributes,I=r.enabledAttributes;for(let W=0,O=I.length;W<O;W++)I[W]!==M[W]&&(i.disableVertexAttribArray(W),I[W]=0)}function x(M,I,W,O,G,$,V){V===!0?i.vertexAttribIPointer(M,I,W,G,$):i.vertexAttribPointer(M,I,W,O,G,$)}function v(M,I,W,O){y();let G=O.attributes,$=W.getAttributes(),V=I.defaultAttributeValues;for(let K in $){let H=$[K];if(H.location>=0){let ne=G[K];if(ne===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(ne=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(ne=M.instanceColor)),ne!==void 0){let he=ne.normalized,Me=ne.itemSize,Be=e.get(ne);if(Be===void 0)continue;let et=Be.buffer,q=Be.type,ee=Be.bytesPerElement,ye=q===i.INT||q===i.UNSIGNED_INT||ne.gpuType===Tc;if(ne.isInterleavedBufferAttribute){let se=ne.data,Ae=se.stride,Le=ne.offset;if(se.isInstancedInterleavedBuffer){for(let ke=0;ke<H.locationSize;ke++)p(H.location+ke,se.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ke=0;ke<H.locationSize;ke++)g(H.location+ke);i.bindBuffer(i.ARRAY_BUFFER,et);for(let ke=0;ke<H.locationSize;ke++)x(H.location+ke,Me/H.locationSize,q,he,Ae*ee,(Le+Me/H.locationSize*ke)*ee,ye)}else{if(ne.isInstancedBufferAttribute){for(let se=0;se<H.locationSize;se++)p(H.location+se,ne.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let se=0;se<H.locationSize;se++)g(H.location+se);i.bindBuffer(i.ARRAY_BUFFER,et);for(let se=0;se<H.locationSize;se++)x(H.location+se,Me/H.locationSize,q,he,Me*ee,Me/H.locationSize*se*ee,ye)}}else if(V!==void 0){let he=V[K];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(H.location,he);break;case 3:i.vertexAttrib3fv(H.location,he);break;case 4:i.vertexAttrib4fv(H.location,he);break;default:i.vertexAttrib1fv(H.location,he)}}}}T()}function P(){R();for(let M in n){let I=n[M];for(let W in I){let O=I[W];for(let G in O)h(O[G].object),delete O[G];delete I[W]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;let I=n[M.id];for(let W in I){let O=I[W];for(let G in O)h(O[G].object),delete O[G];delete I[W]}delete n[M.id]}function A(M){for(let I in n){let W=n[I];if(W[M.id]===void 0)continue;let O=W[M.id];for(let G in O)h(O[G].object),delete O[G];delete W[M.id]}}function R(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:g,disableUnusedAttributes:T}}function W_(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let y=0;y<u;y++)m+=h[y]*d[y];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function X_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==si&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let R=A===_r&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==xi&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==ni&&!R)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:T,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:P,maxSamples:E}}function q_(i){let e=this,t=null,n=0,s=!1,r=!1,a=new gi,o=new Pe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{let T=r?0:n,x=T*4,v=p.clippingState||null;l.value=v,v=h(m,d,x,f);for(let P=0;P!==x;++P)v[P]=t[P];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=l.value,m!==!0||g===null){let p=f+y*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,v=f;x!==y;++x,v+=4)a.copy(u[x]).applyMatrix4(T,o),a.normal.toArray(g,v),g[v+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function Y_(i){let e=new WeakMap;function t(a,o){return o===gl?a.mapping=vs:o===yl&&(a.mapping=bs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===gl||o===yl)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Zl(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Xi=class extends Aa{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ps=4,Uu=[.125,.215,.35,.446,.526,.582],Vn=20,Jo=new Xi,Nu=new Se,Ko=null,Qo=0,el=0,tl=!1,kn=(1+Math.sqrt(5))/2,us=1/kn,Ou=[new C(-kn,us,0),new C(kn,us,0),new C(-us,0,kn),new C(us,0,kn),new C(0,kn,-us),new C(0,kn,us),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],Ra=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ko=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),el=this._renderer.getActiveMipmapLevel(),tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ko,Qo,el),this._renderer.xr.enabled=tl,e.scissorTest=!1,la(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vs||e.mapping===bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ko=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),el=this._renderer.getActiveMipmapLevel(),tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:_r,format:si,colorSpace:Tt,depthBuffer:!1},s=Fu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=j_(r)),this._blurMaterial=Z_(r,e,t)}return s}_compileMaterial(e){let t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,Jo)}_sceneToCubeUV(e,t,n,s){let o=new gt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Nu),h.toneMapping=mn,h.autoClear=!1;let f=new $t({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),m=new ct(new Wi,f),y=!1,g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,y=!0):(f.color.copy(Nu),y=!0);for(let p=0;p<6;p++){let T=p%3;T===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):T===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let x=this._cubeSize;la(s,T*x,p>2?x:0,x,x),h.setRenderTarget(s),y&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===vs||e.mapping===bs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;la(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Jo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Ou[(s-r-1)%Ou.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ct(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Vn-1),y=r/m,g=isFinite(r)?1+Math.floor(h*y):Vn;g>Vn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Vn}`);let p=[],T=0;for(let A=0;A<Vn;++A){let R=A/y,S=Math.exp(-R*R/2);p.push(S),A===0?T+=S:A<g&&(T+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/T;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-n;let v=this._sizeLods[s],P=3*v*(s>x-ps?s-x+ps:0),E=4*(this._cubeSize-v);la(t,P,E,3*v,2*v),l.setRenderTarget(t),l.render(u,Jo)}};function j_(i){let e=[],t=[],n=[],s=i,r=i-ps+1+Uu.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-ps?l=Uu[a-i+ps-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,y=3,g=2,p=1,T=new Float32Array(y*m*f),x=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let E=0;E<f;E++){let A=E%3*2/3-1,R=E>2?0:-1,S=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];T.set(S,y*m*E),x.set(d,g*m*E);let M=[E,E,E,E,E,E];v.set(M,p*m*E)}let P=new _t;P.setAttribute("position",new je(T,y)),P.setAttribute("uv",new je(x,g)),P.setAttribute("faceIndex",new je(v,p)),e.push(P),s>ps&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Fu(i,e,t){let n=new ri(i,e,t);return n.texture.mapping=ja,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function la(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Z_(i,e,t){let n=new Float32Array(Vn),s=new C(0,1,0);return new Jt({name:"SphericalGaussianBlur",defines:{n:Vn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function Bu(){return new Jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function ku(){return new Jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function Pc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function $_(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===gl||l===yl,h=l===vs||l===bs;if(c||h){let u=e.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Ra(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Ra(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function J_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&er("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function K_(i,e,t,n){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);for(let m in d.morphAttributes){let y=d.morphAttributes[m];for(let g=0,p=y.length;g<p;g++)e.remove(y[g])}d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let m in d)e.update(d[m],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let m in f){let y=f[m];for(let g=0,p=y.length;g<p;g++)e.update(y[g],i.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,m=u.attributes.position,y=0;if(f!==null){let T=f.array;y=f.version;for(let x=0,v=T.length;x<v;x+=3){let P=T[x+0],E=T[x+1],A=T[x+2];d.push(P,E,E,A,A,P)}}else if(m!==void 0){let T=m.array;y=m.version;for(let x=0,v=T.length/3-1;x<v;x+=3){let P=x+0,E=x+1,A=x+2;d.push(P,E,E,A,A,P)}}else return;let g=new(Bd(d)?Ea:wa)(d,1);g.version=y;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Q_(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*a,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,y){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],y[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,y,0,m);let p=0;for(let T=0;T<m;T++)p+=f[T]*y[T];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function e0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function t0(i,e,t){let n=new WeakMap,s=new qe;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let S=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],x=0;f===!0&&(x=1),m===!0&&(x=2),y===!0&&(x=3);let v=o.attributes.position.count*x,P=1;v>e.maxTextureSize&&(P=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let E=new Float32Array(v*P*4*u),A=new Ta(E,v,P,u);A.type=ni,A.needsUpdate=!0;let R=x*4;for(let M=0;M<u;M++){let I=g[M],W=p[M],O=T[M],G=v*P*4*M;for(let $=0;$<I.count;$++){let V=$*R;f===!0&&(s.fromBufferAttribute(I,$),E[G+V+0]=s.x,E[G+V+1]=s.y,E[G+V+2]=s.z,E[G+V+3]=0),m===!0&&(s.fromBufferAttribute(W,$),E[G+V+4]=s.x,E[G+V+5]=s.y,E[G+V+6]=s.z,E[G+V+7]=0),y===!0&&(s.fromBufferAttribute(O,$),E[G+V+8]=s.x,E[G+V+9]=s.y,E[G+V+10]=s.z,E[G+V+11]=O.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new ve(v,P)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function i0(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Pa=class extends yt{constructor(e,t,n,s,r,a,o,l,c,h=gs){if(h!==gs&&h!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gs&&(n=Gn),n===void 0&&h===Ss&&(n=Ms),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ct,this.minFilter=l!==void 0?l:Ct,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Hd=new yt,zu=new Pa(1,1),Gd=new Ta,Wd=new Yl,Xd=new Ca,Vu=[],Hu=[],Gu=new Float32Array(16),Wu=new Float32Array(9),Xu=new Float32Array(4);function Os(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Vu[s];if(r===void 0&&(r=new Float32Array(s),Vu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function eo(i,e){let t=Hu[e];t===void 0&&(t=new Int32Array(e),Hu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function n0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function s0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),vt(t,e)}}function r0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),vt(t,e)}}function a0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),vt(t,e)}}function o0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(xt(t,n))return;Xu.set(n),i.uniformMatrix2fv(this.addr,!1,Xu),vt(t,n)}}function l0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(xt(t,n))return;Wu.set(n),i.uniformMatrix3fv(this.addr,!1,Wu),vt(t,n)}}function c0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(xt(t,n))return;Gu.set(n),i.uniformMatrix4fv(this.addr,!1,Gu),vt(t,n)}}function h0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function u0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),vt(t,e)}}function d0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),vt(t,e)}}function f0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),vt(t,e)}}function p0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function m0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),vt(t,e)}}function g0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),vt(t,e)}}function y0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),vt(t,e)}}function _0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(zu.compareFunction=Fd,r=zu):r=Hd,t.setTexture2D(e||r,s)}function x0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Wd,s)}function v0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Xd,s)}function b0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Gd,s)}function M0(i){switch(i){case 5126:return n0;case 35664:return s0;case 35665:return r0;case 35666:return a0;case 35674:return o0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return h0;case 35667:case 35671:return u0;case 35668:case 35672:return d0;case 35669:case 35673:return f0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return y0;case 35678:case 36198:case 36298:case 36306:case 35682:return _0;case 35679:case 36299:case 36307:return x0;case 35680:case 36300:case 36308:case 36293:return v0;case 36289:case 36303:case 36311:case 36292:return b0}}function S0(i,e){i.uniform1fv(this.addr,e)}function T0(i,e){let t=Os(e,this.size,2);i.uniform2fv(this.addr,t)}function w0(i,e){let t=Os(e,this.size,3);i.uniform3fv(this.addr,t)}function E0(i,e){let t=Os(e,this.size,4);i.uniform4fv(this.addr,t)}function A0(i,e){let t=Os(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function C0(i,e){let t=Os(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function R0(i,e){let t=Os(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function P0(i,e){i.uniform1iv(this.addr,e)}function I0(i,e){i.uniform2iv(this.addr,e)}function L0(i,e){i.uniform3iv(this.addr,e)}function D0(i,e){i.uniform4iv(this.addr,e)}function U0(i,e){i.uniform1uiv(this.addr,e)}function N0(i,e){i.uniform2uiv(this.addr,e)}function O0(i,e){i.uniform3uiv(this.addr,e)}function F0(i,e){i.uniform4uiv(this.addr,e)}function B0(i,e,t){let n=this.cache,s=e.length,r=eo(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Hd,r[a])}function k0(i,e,t){let n=this.cache,s=e.length,r=eo(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Wd,r[a])}function z0(i,e,t){let n=this.cache,s=e.length,r=eo(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Xd,r[a])}function V0(i,e,t){let n=this.cache,s=e.length,r=eo(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Gd,r[a])}function H0(i){switch(i){case 5126:return S0;case 35664:return T0;case 35665:return w0;case 35666:return E0;case 35674:return A0;case 35675:return C0;case 35676:return R0;case 5124:case 35670:return P0;case 35667:case 35671:return I0;case 35668:case 35672:return L0;case 35669:case 35673:return D0;case 5125:return U0;case 36294:return N0;case 36295:return O0;case 36296:return F0;case 35678:case 36198:case 36298:case 36306:case 35682:return B0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return z0;case 36289:case 36303:case 36311:case 36292:return V0}}var $l=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=M0(t.type)}},Jl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=H0(t.type)}},Kl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},il=/(\w+)(\])?(\[|\.)?/g;function qu(i,e){i.seq.push(e),i.map[e.id]=e}function G0(i,e,t){let n=i.name,s=n.length;for(il.lastIndex=0;;){let r=il.exec(n),a=il.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){qu(t,c===void 0?new $l(o,i,e):new Jl(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Kl(o),qu(t,u)),t=u}}}var _s=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);G0(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Yu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var W0=37297,X0=0;function q0(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var ju=new Pe;function Y0(i){Fe._getMatrix(ju,Fe.workingColorSpace,i);let e=`mat3( ${ju.elements.map(t=>t.toFixed(4))} )`;switch(Fe.getTransfer(i)){case Qa:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Zu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+q0(i.getShaderSource(e),a)}else return s}function j0(i,e){let t=Y0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Z0(i,e){let t;switch(e){case sm:t="Linear";break;case rm:t="Reinhard";break;case am:t="Cineon";break;case om:t="ACESFilmic";break;case cm:t="AgX";break;case hm:t="Neutral";break;case lm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ca=new C;function $0(){Fe.getLuminanceCoefficients(ca);let i=ca.x.toFixed(4),e=ca.y.toFixed(4),t=ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function K0(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Q0(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function tr(i){return i!==""}function $u(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ju(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ex=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(i){return i.replace(ex,ix)}var tx=new Map;function ix(i,e){let t=Oe[e];if(t===void 0){let n=tx.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ql(t)}var nx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ku(i){return i.replace(nx,sx)}function sx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function rx(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Td?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===zp?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===zi&&(e="SHADOWMAP_TYPE_VSM"),e}function ax(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vs:case bs:e="ENVMAP_TYPE_CUBE";break;case ja:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ox(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===bs&&(e="ENVMAP_MODE_REFRACTION"),e}function lx(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case wd:e="ENVMAP_BLENDING_MULTIPLY";break;case im:e="ENVMAP_BLENDING_MIX";break;case nm:e="ENVMAP_BLENDING_ADD";break}return e}function cx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function hx(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=rx(t),c=ax(t),h=ox(t),u=lx(t),d=cx(t),f=J0(t),m=K0(r),y=s.createProgram(),g,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(tr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(tr).join(`
`),p.length>0&&(p+=`
`)):(g=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),p=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mn?"#define TONE_MAPPING":"",t.toneMapping!==mn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==mn?Z0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,j0("linearToOutputTexel",t.outputColorSpace),$0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(tr).join(`
`)),a=Ql(a),a=$u(a,t),a=Ju(a,t),o=Ql(o),o=$u(o,t),o=Ju(o,t),a=Ku(a),o=Ku(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===du?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===du?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=T+g+a,v=T+p+o,P=Yu(s,s.VERTEX_SHADER,x),E=Yu(s,s.FRAGMENT_SHADER,v);s.attachShader(y,P),s.attachShader(y,E),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function A(I){if(i.debug.checkShaderErrors){let W=s.getProgramInfoLog(y).trim(),O=s.getShaderInfoLog(P).trim(),G=s.getShaderInfoLog(E).trim(),$=!0,V=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,P,E);else{let K=Zu(s,P,"vertex"),H=Zu(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+W+`
`+K+`
`+H)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(O===""||G==="")&&(V=!1);V&&(I.diagnostics={runnable:$,programLog:W,vertexShader:{log:O,prefix:g},fragmentShader:{log:G,prefix:p}})}s.deleteShader(P),s.deleteShader(E),R=new _s(s,y),S=Q0(s,y)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(y,W0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=X0++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=E,this}var ux=0,ec=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new tc(e),t.set(e,n)),n}},tc=class{constructor(e){this.id=ux++,this.code=e,this.usedTimes=0}};function dx(i,e,t,n,s,r,a){let o=new hr,l=new ec,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,I,W,O){let G=W.fog,$=O.geometry,V=S.isMeshStandardMaterial?W.environment:null,K=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),H=K&&K.mapping===ja?K.image.height:null,ne=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let he=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Me=he!==void 0?he.length:0,Be=0;$.morphAttributes.position!==void 0&&(Be=1),$.morphAttributes.normal!==void 0&&(Be=2),$.morphAttributes.color!==void 0&&(Be=3);let et,q,ee,ye;if(ne){let Je=wi[ne];et=Je.vertexShader,q=Je.fragmentShader}else et=S.vertexShader,q=S.fragmentShader,l.update(S),ee=l.getVertexShaderID(S),ye=l.getFragmentShaderID(S);let se=i.getRenderTarget(),Ae=i.state.buffers.depth.getReversed(),Le=O.isInstancedMesh===!0,ke=O.isBatchedMesh===!0,ht=!!S.map,We=!!S.matcap,pt=!!K,N=!!S.aoMap,Qt=!!S.lightMap,Ve=!!S.bumpMap,He=!!S.normalMap,we=!!S.displacementMap,at=!!S.emissiveMap,Te=!!S.metalnessMap,w=!!S.roughnessMap,_=S.anisotropy>0,F=S.clearcoat>0,Y=S.dispersion>0,Z=S.iridescence>0,X=S.sheen>0,_e=S.transmission>0,re=_&&!!S.anisotropyMap,ue=F&&!!S.clearcoatMap,Xe=F&&!!S.clearcoatNormalMap,J=F&&!!S.clearcoatRoughnessMap,de=Z&&!!S.iridescenceMap,Ee=Z&&!!S.iridescenceThicknessMap,Re=X&&!!S.sheenColorMap,fe=X&&!!S.sheenRoughnessMap,Ge=!!S.specularMap,Ne=!!S.specularColorMap,it=!!S.specularIntensityMap,L=_e&&!!S.transmissionMap,ie=_e&&!!S.thicknessMap,z=!!S.gradientMap,j=!!S.alphaMap,le=S.alphaTest>0,ae=!!S.alphaHash,De=!!S.extensions,dt=mn;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(dt=i.toneMapping);let Pt={shaderID:ne,shaderType:S.type,shaderName:S.name,vertexShader:et,fragmentShader:q,defines:S.defines,customVertexShaderID:ee,customFragmentShaderID:ye,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:ke,batchingColor:ke&&O._colorsTexture!==null,instancing:Le,instancingColor:Le&&O.instanceColor!==null,instancingMorph:Le&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Tt,alphaToCoverage:!!S.alphaToCoverage,map:ht,matcap:We,envMap:pt,envMapMode:pt&&K.mapping,envMapCubeUVHeight:H,aoMap:N,lightMap:Qt,bumpMap:Ve,normalMap:He,displacementMap:d&&we,emissiveMap:at,normalMapObjectSpace:He&&S.normalMapType===mm,normalMapTangentSpace:He&&S.normalMapType===Od,metalnessMap:Te,roughnessMap:w,anisotropy:_,anisotropyMap:re,clearcoat:F,clearcoatMap:ue,clearcoatNormalMap:Xe,clearcoatRoughnessMap:J,dispersion:Y,iridescence:Z,iridescenceMap:de,iridescenceThicknessMap:Ee,sheen:X,sheenColorMap:Re,sheenRoughnessMap:fe,specularMap:Ge,specularColorMap:Ne,specularIntensityMap:it,transmission:_e,transmissionMap:L,thicknessMap:ie,gradientMap:z,opaque:S.transparent===!1&&S.blending===ms&&S.alphaToCoverage===!1,alphaMap:j,alphaTest:le,alphaHash:ae,combine:S.combine,mapUv:ht&&y(S.map.channel),aoMapUv:N&&y(S.aoMap.channel),lightMapUv:Qt&&y(S.lightMap.channel),bumpMapUv:Ve&&y(S.bumpMap.channel),normalMapUv:He&&y(S.normalMap.channel),displacementMapUv:we&&y(S.displacementMap.channel),emissiveMapUv:at&&y(S.emissiveMap.channel),metalnessMapUv:Te&&y(S.metalnessMap.channel),roughnessMapUv:w&&y(S.roughnessMap.channel),anisotropyMapUv:re&&y(S.anisotropyMap.channel),clearcoatMapUv:ue&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:fe&&y(S.sheenRoughnessMap.channel),specularMapUv:Ge&&y(S.specularMap.channel),specularColorMapUv:Ne&&y(S.specularColorMap.channel),specularIntensityMapUv:it&&y(S.specularIntensityMap.channel),transmissionMapUv:L&&y(S.transmissionMap.channel),thicknessMapUv:ie&&y(S.thicknessMap.channel),alphaMapUv:j&&y(S.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(He||_),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!$.attributes.uv&&(ht||j),fog:!!G,useFog:S.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ae,skinning:O.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Be,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:dt,decodeVideoTexture:ht&&S.map.isVideoTexture===!0&&Fe.getTransfer(S.map.colorSpace)===Qe,decodeVideoTextureEmissive:at&&S.emissiveMap.isVideoTexture===!0&&Fe.getTransfer(S.emissiveMap.colorSpace)===Qe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ii,flipSided:S.side===Vt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:De&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&S.extensions.multiDraw===!0||ke)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pt.vertexUv1s=c.has(1),Pt.vertexUv2s=c.has(2),Pt.vertexUv3s=c.has(3),c.clear(),Pt}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let I in S.defines)M.push(I),M.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(T(M,S),x(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function T(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function v(S){let M=m[S.type],I;if(M){let W=wi[M];I=ig.clone(W.uniforms)}else I=S.uniforms;return I}function P(S,M){let I;for(let W=0,O=h.length;W<O;W++){let G=h[W];if(G.cacheKey===M){I=G,++I.usedTimes;break}}return I===void 0&&(I=new hx(i,M,S,r),h.push(I)),I}function E(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:P,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:R}}function fx(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function px(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ed(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function td(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,d,f,m,y,g){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:y,group:g},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=y,p.group=g),e++,p}function o(u,d,f,m,y,g){let p=a(u,d,f,m,y,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,m,y,g){let p=a(u,d,f,m,y,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||px),n.length>1&&n.sort(d||ed),s.length>1&&s.sort(d||ed)}function h(){for(let u=e,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function mx(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new td,i.set(n,[a])):s>=r.length?(a=new td,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function gx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Se};break;case"SpotLight":t={position:new C,direction:new C,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function yx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var _x=0;function xx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function vx(i){let e=new gx,t=yx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let s=new C,r=new ce,a=new ce;function o(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,T=0,x=0,v=0,P=0,E=0,A=0;c.sort(xx);for(let S=0,M=c.length;S<M;S++){let I=c[S],W=I.color,O=I.intensity,G=I.distance,$=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=W.r*O,u+=W.g*O,d+=W.b*O;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],O);A++}else if(I.isDirectionalLight){let V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let K=I.shadow,H=t.get(I);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=I.shadow.matrix,T++}n.directional[f]=V,f++}else if(I.isSpotLight){let V=e.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(W).multiplyScalar(O),V.distance=G,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[y]=V;let K=I.shadow;if(I.map&&(n.spotLightMap[P]=I.map,P++,K.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[y]=K.matrix,I.castShadow){let H=t.get(I);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.spotShadow[y]=H,n.spotShadowMap[y]=$,v++}y++}else if(I.isRectAreaLight){let V=e.get(I);V.color.copy(W).multiplyScalar(O),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=V,g++}else if(I.isPointLight){let V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){let K=I.shadow,H=t.get(I);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,H.shadowCameraNear=K.camera.near,H.shadowCameraFar=K.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=$,n.pointShadowMatrix[m]=I.shadow.matrix,x++}n.point[m]=V,m++}else if(I.isHemisphereLight){let V=e.get(I);V.skyColor.copy(I.color).multiplyScalar(O),V.groundColor.copy(I.groundColor).multiplyScalar(O),n.hemi[p]=V,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=te.LTC_FLOAT_1,n.rectAreaLTC2=te.LTC_FLOAT_2):(n.rectAreaLTC1=te.LTC_HALF_1,n.rectAreaLTC2=te.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==y||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==T||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==P||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+P-E,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,R.directionalLength=f,R.pointLength=m,R.spotLength=y,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=T,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=P,R.numLightProbes=A,n.version=_x++)}function l(c,h){let u=0,d=0,f=0,m=0,y=0,g=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){let x=c[p];if(x.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),u++}else if(x.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),f++}else if(x.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),a.identity(),r.copy(x.matrixWorld),r.premultiply(g),a.extractRotation(r),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),m++}else if(x.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){let v=n.hemi[y];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:n}}function id(i){let e=new vx(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function bx(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new id(i),e.set(s,[o])):r>=a.length?(o=new id(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var ic=class extends Zt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=fm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},nc=class extends Zt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Mx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tx(i,e,t){let n=new gn,s=new ve,r=new ve,a=new qe,o=new ic({depthPacking:pm}),l=new nc,c={},h=t.maxTextureSize,u={[Ai]:Vt,[Vt]:Ai,[ii]:ii},d=new Jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:Mx,fragmentShader:Sx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new _t;m.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ct(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Td;let p=this.type;this.render=function(E,A,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;let S=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),W=i.state;W.setBlending(pn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let O=p!==zi&&this.type===zi,G=p===zi&&this.type!==zi;for(let $=0,V=E.length;$<V;$++){let K=E[$],H=K.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let ne=H.getFrameExtents();if(s.multiply(ne),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ne.x),s.x=r.x*ne.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ne.y),s.y=r.y*ne.y,H.mapSize.y=r.y)),H.map===null||O===!0||G===!0){let Me=this.type!==zi?{minFilter:Ct,magFilter:Ct}:{};H.map!==null&&H.map.dispose(),H.map=new ri(s.x,s.y,Me),H.map.texture.name=K.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();let he=H.getViewportCount();for(let Me=0;Me<he;Me++){let Be=H.getViewport(Me);a.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),W.viewport(a),H.updateMatrices(K,Me),n=H.getFrustum(),v(A,R,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===zi&&T(H,R),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,M,I)};function T(E,A){let R=e.update(y);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ri(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,R,d,y,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,R,f,y,null)}function x(E,A,R,S){let M=null,I=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)M=I;else if(M=R.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let W=M.uuid,O=A.uuid,G=c[W];G===void 0&&(G={},c[W]=G);let $=G[O];$===void 0&&($=M.clone(),G[O]=$,A.addEventListener("dispose",P)),M=$}if(M.visible=A.visible,M.wireframe=A.wireframe,S===zi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let W=i.properties.get(M);W.light=R}return M}function v(E,A,R,S,M){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===zi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);let O=e.update(E),G=E.material;if(Array.isArray(G)){let $=O.groups;for(let V=0,K=$.length;V<K;V++){let H=$[V],ne=G[H.materialIndex];if(ne&&ne.visible){let he=x(E,ne,S,M);E.onBeforeShadow(i,E,A,R,O,he,H),i.renderBufferDirect(R,null,O,he,E,H),E.onAfterShadow(i,E,A,R,O,he,H)}}}else if(G.visible){let $=x(E,G,S,M);E.onBeforeShadow(i,E,A,R,O,$,null),i.renderBufferDirect(R,null,O,$,E,null),E.onAfterShadow(i,E,A,R,O,$,null)}}let W=E.children;for(let O=0,G=W.length;O<G;O++)v(W[O],A,R,S,M)}function P(E){E.target.removeEventListener("dispose",P);for(let R in c){let S=c[R],M=E.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var wx={[hl]:ul,[dl]:Ma,[fl]:ml,[xs]:pl,[ul]:hl,[Ma]:dl,[ml]:fl,[pl]:xs};function Ex(i,e){function t(){let L=!1,ie=new qe,z=null,j=new qe(0,0,0,0);return{setMask:function(le){z!==le&&!L&&(i.colorMask(le,le,le,le),z=le)},setLocked:function(le){L=le},setClear:function(le,ae,De,dt,Pt){Pt===!0&&(le*=dt,ae*=dt,De*=dt),ie.set(le,ae,De,dt),j.equals(ie)===!1&&(i.clearColor(le,ae,De,dt),j.copy(ie))},reset:function(){L=!1,z=null,j.set(-1,0,0,0)}}}function n(){let L=!1,ie=!1,z=null,j=null,le=null;return{setReversed:function(ae){if(ie!==ae){let De=e.get("EXT_clip_control");ie?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);let dt=le;le=null,this.setClear(dt)}ie=ae},getReversed:function(){return ie},setTest:function(ae){ae?se(i.DEPTH_TEST):Ae(i.DEPTH_TEST)},setMask:function(ae){z!==ae&&!L&&(i.depthMask(ae),z=ae)},setFunc:function(ae){if(ie&&(ae=wx[ae]),j!==ae){switch(ae){case hl:i.depthFunc(i.NEVER);break;case ul:i.depthFunc(i.ALWAYS);break;case dl:i.depthFunc(i.LESS);break;case xs:i.depthFunc(i.LEQUAL);break;case fl:i.depthFunc(i.EQUAL);break;case pl:i.depthFunc(i.GEQUAL);break;case Ma:i.depthFunc(i.GREATER);break;case ml:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=ae}},setLocked:function(ae){L=ae},setClear:function(ae){le!==ae&&(ie&&(ae=1-ae),i.clearDepth(ae),le=ae)},reset:function(){L=!1,z=null,j=null,le=null,ie=!1}}}function s(){let L=!1,ie=null,z=null,j=null,le=null,ae=null,De=null,dt=null,Pt=null;return{setTest:function(Je){L||(Je?se(i.STENCIL_TEST):Ae(i.STENCIL_TEST))},setMask:function(Je){ie!==Je&&!L&&(i.stencilMask(Je),ie=Je)},setFunc:function(Je,ui,Li){(z!==Je||j!==ui||le!==Li)&&(i.stencilFunc(Je,ui,Li),z=Je,j=ui,le=Li)},setOp:function(Je,ui,Li){(ae!==Je||De!==ui||dt!==Li)&&(i.stencilOp(Je,ui,Li),ae=Je,De=ui,dt=Li)},setLocked:function(Je){L=Je},setClear:function(Je){Pt!==Je&&(i.clearStencil(Je),Pt=Je)},reset:function(){L=!1,ie=null,z=null,j=null,le=null,ae=null,De=null,dt=null,Pt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],m=null,y=!1,g=null,p=null,T=null,x=null,v=null,P=null,E=null,A=new Se(0,0,0),R=0,S=!1,M=null,I=null,W=null,O=null,G=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,K=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=K>=1):H.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=K>=2);let ne=null,he={},Me=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),et=new qe().fromArray(Me),q=new qe().fromArray(Be);function ee(L,ie,z,j){let le=new Uint8Array(4),ae=i.createTexture();i.bindTexture(L,ae),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<z;De++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(ie+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return ae}let ye={};ye[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),ye[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ye[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(i.DEPTH_TEST),a.setFunc(xs),Ve(!1),He(nu),se(i.CULL_FACE),N(pn);function se(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function Ae(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Le(L,ie){return u[L]!==ie?(i.bindFramebuffer(L,ie),u[L]=ie,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ie),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function ke(L,ie){let z=f,j=!1;if(L){z=d.get(ie),z===void 0&&(z=[],d.set(ie,z));let le=L.textures;if(z.length!==le.length||z[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,De=le.length;ae<De;ae++)z[ae]=i.COLOR_ATTACHMENT0+ae;z.length=le.length,j=!0}}else z[0]!==i.BACK&&(z[0]=i.BACK,j=!0);j&&i.drawBuffers(z)}function ht(L){return m!==L?(i.useProgram(L),m=L,!0):!1}let We={[zn]:i.FUNC_ADD,[Vp]:i.FUNC_SUBTRACT,[Hp]:i.FUNC_REVERSE_SUBTRACT};We[Gp]=i.MIN,We[Wp]=i.MAX;let pt={[bc]:i.ZERO,[Mc]:i.ONE,[Xp]:i.SRC_COLOR,[ll]:i.SRC_ALPHA,[Jp]:i.SRC_ALPHA_SATURATE,[Zp]:i.DST_COLOR,[Yp]:i.DST_ALPHA,[qp]:i.ONE_MINUS_SRC_COLOR,[cl]:i.ONE_MINUS_SRC_ALPHA,[$p]:i.ONE_MINUS_DST_COLOR,[jp]:i.ONE_MINUS_DST_ALPHA,[Kp]:i.CONSTANT_COLOR,[Qp]:i.ONE_MINUS_CONSTANT_COLOR,[em]:i.CONSTANT_ALPHA,[tm]:i.ONE_MINUS_CONSTANT_ALPHA};function N(L,ie,z,j,le,ae,De,dt,Pt,Je){if(L===pn){y===!0&&(Ae(i.BLEND),y=!1);return}if(y===!1&&(se(i.BLEND),y=!0),L!==vc){if(L!==g||Je!==S){if((p!==zn||v!==zn)&&(i.blendEquation(i.FUNC_ADD),p=zn,v=zn),Je)switch(L){case ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case su:i.blendFunc(i.ONE,i.ONE);break;case ru:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case au:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case su:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ru:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case au:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}T=null,x=null,P=null,E=null,A.set(0,0,0),R=0,g=L,S=Je}return}le=le||ie,ae=ae||z,De=De||j,(ie!==p||le!==v)&&(i.blendEquationSeparate(We[ie],We[le]),p=ie,v=le),(z!==T||j!==x||ae!==P||De!==E)&&(i.blendFuncSeparate(pt[z],pt[j],pt[ae],pt[De]),T=z,x=j,P=ae,E=De),(dt.equals(A)===!1||Pt!==R)&&(i.blendColor(dt.r,dt.g,dt.b,Pt),A.copy(dt),R=Pt),g=L,S=!1}function Qt(L,ie){L.side===ii?Ae(i.CULL_FACE):se(i.CULL_FACE);let z=L.side===Vt;ie&&(z=!z),Ve(z),L.blending===ms&&L.transparent===!1?N(pn):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);let j=L.stencilWrite;o.setTest(j),j&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),at(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):Ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(L){M!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),M=L)}function He(L){L!==Bp?(se(i.CULL_FACE),L!==I&&(L===nu?i.cullFace(i.BACK):L===kp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ae(i.CULL_FACE),I=L}function we(L){L!==W&&(V&&i.lineWidth(L),W=L)}function at(L,ie,z){L?(se(i.POLYGON_OFFSET_FILL),(O!==ie||G!==z)&&(i.polygonOffset(ie,z),O=ie,G=z)):Ae(i.POLYGON_OFFSET_FILL)}function Te(L){L?se(i.SCISSOR_TEST):Ae(i.SCISSOR_TEST)}function w(L){L===void 0&&(L=i.TEXTURE0+$-1),ne!==L&&(i.activeTexture(L),ne=L)}function _(L,ie,z){z===void 0&&(ne===null?z=i.TEXTURE0+$-1:z=ne);let j=he[z];j===void 0&&(j={type:void 0,texture:void 0},he[z]=j),(j.type!==L||j.texture!==ie)&&(ne!==z&&(i.activeTexture(z),ne=z),i.bindTexture(L,ie||ye[L]),j.type=L,j.texture=ie)}function F(){let L=he[ne];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function X(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function re(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Xe(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(L){et.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),et.copy(L))}function fe(L){q.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),q.copy(L))}function Ge(L,ie){let z=c.get(ie);z===void 0&&(z=new WeakMap,c.set(ie,z));let j=z.get(L);j===void 0&&(j=i.getUniformBlockIndex(ie,L.name),z.set(L,j))}function Ne(L,ie){let j=c.get(ie).get(L);l.get(ie)!==j&&(i.uniformBlockBinding(ie,j,L.__bindingPointIndex),l.set(ie,j))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ne=null,he={},u={},d=new WeakMap,f=[],m=null,y=!1,g=null,p=null,T=null,x=null,v=null,P=null,E=null,A=new Se(0,0,0),R=0,S=!1,M=null,I=null,W=null,O=null,G=null,et.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:se,disable:Ae,bindFramebuffer:Le,drawBuffers:ke,useProgram:ht,setBlending:N,setMaterial:Qt,setFlipSided:Ve,setCullFace:He,setLineWidth:we,setPolygonOffset:at,setScissorTest:Te,activeTexture:w,bindTexture:_,unbindTexture:F,compressedTexImage2D:Y,compressedTexImage3D:Z,texImage2D:de,texImage3D:Ee,updateUBOMapping:Ge,uniformBlockBinding:Ne,texStorage2D:Xe,texStorage3D:J,texSubImage2D:X,texSubImage3D:_e,compressedTexSubImage2D:re,compressedTexSubImage3D:ue,scissor:Re,viewport:fe,reset:it}}function Ax(i,e){let t=i.image&&i.image.width?i.image.width/i.image.height:1;return t>e?(i.repeat.x=1,i.repeat.y=t/e,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2):(i.repeat.x=e/t,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0),i}function Cx(i,e){let t=i.image&&i.image.width?i.image.width/i.image.height:1;return t>e?(i.repeat.x=e/t,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0):(i.repeat.x=1,i.repeat.y=t/e,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2),i}function Rx(i){return i.repeat.x=1,i.repeat.y=1,i.offset.x=0,i.offset.y=0,i}function sc(i,e,t,n){let s=Px(n);switch(t){case Pd:return i*e;case Ld:return i*e;case Dd:return i*e*2;case Za:return i*e/s.components*s.byteLength;case Ac:return i*e/s.components*s.byteLength;case $a:return i*e*2/s.components*s.byteLength;case Cc:return i*e*2/s.components*s.byteLength;case Id:return i*e*3/s.components*s.byteLength;case si:return i*e*4/s.components*s.byteLength;case Ja:return i*e*4/s.components*s.byteLength;case ya:case _a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xa:case va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xl:case bl:return Math.max(i,16)*Math.max(e,8)/4;case _l:case vl:return Math.max(i,8)*Math.max(e,8)/2;case Ml:case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Tl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Al:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ol:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Bl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ba:case kl:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ud:case Vl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Hl:case Gl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Px(i){switch(i){case xi:case Ad:return{byteLength:1,components:1};case or:case Cd:case _r:return{byteLength:2,components:1};case wc:case Ec:return{byteLength:2,components:4};case Gn:case Tc:case ni:return{byteLength:4,components:1};case Rd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}var Ic={contain:Ax,cover:Cx,fill:Rx,getByteLength:sc};function Ix(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ve,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,_){return f?new OffscreenCanvas(w,_):lr("canvas")}function y(w,_,F){let Y=1,Z=Te(w);if((Z.width>F||Z.height>F)&&(Y=F/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let X=Math.floor(Y*Z.width),_e=Math.floor(Y*Z.height);u===void 0&&(u=m(X,_e));let re=_?m(X,_e):u;return re.width=X,re.height=_e,re.getContext("2d").drawImage(w,0,0,X,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+X+"x"+_e+")."),re}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),w;return w}function g(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function T(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(w,_,F,Y,Z=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let X=_;if(_===i.RED&&(F===i.FLOAT&&(X=i.R32F),F===i.HALF_FLOAT&&(X=i.R16F),F===i.UNSIGNED_BYTE&&(X=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.R8UI),F===i.UNSIGNED_SHORT&&(X=i.R16UI),F===i.UNSIGNED_INT&&(X=i.R32UI),F===i.BYTE&&(X=i.R8I),F===i.SHORT&&(X=i.R16I),F===i.INT&&(X=i.R32I)),_===i.RG&&(F===i.FLOAT&&(X=i.RG32F),F===i.HALF_FLOAT&&(X=i.RG16F),F===i.UNSIGNED_BYTE&&(X=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RG8UI),F===i.UNSIGNED_SHORT&&(X=i.RG16UI),F===i.UNSIGNED_INT&&(X=i.RG32UI),F===i.BYTE&&(X=i.RG8I),F===i.SHORT&&(X=i.RG16I),F===i.INT&&(X=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGB8UI),F===i.UNSIGNED_SHORT&&(X=i.RGB16UI),F===i.UNSIGNED_INT&&(X=i.RGB32UI),F===i.BYTE&&(X=i.RGB8I),F===i.SHORT&&(X=i.RGB16I),F===i.INT&&(X=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),F===i.UNSIGNED_INT&&(X=i.RGBA32UI),F===i.BYTE&&(X=i.RGBA8I),F===i.SHORT&&(X=i.RGBA16I),F===i.INT&&(X=i.RGBA32I)),_===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),_===i.RGBA){let _e=Z?Qa:Fe.getTransfer(Y);F===i.FLOAT&&(X=i.RGBA32F),F===i.HALF_FLOAT&&(X=i.RGBA16F),F===i.UNSIGNED_BYTE&&(X=_e===Qe?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(w,_){let F;return w?_===null||_===Gn||_===Ms?F=i.DEPTH24_STENCIL8:_===ni?F=i.DEPTH32F_STENCIL8:_===or&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Gn||_===Ms?F=i.DEPTH_COMPONENT24:_===ni?F=i.DEPTH_COMPONENT32F:_===or&&(F=i.DEPTH_COMPONENT16),F}function P(w,_){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ct&&w.minFilter!==Ot?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function E(w){let _=w.target;_.removeEventListener("dispose",E),R(_),_.isVideoTexture&&h.delete(_)}function A(w){let _=w.target;_.removeEventListener("dispose",A),M(_)}function R(w){let _=n.get(w);if(_.__webglInit===void 0)return;let F=w.source,Y=d.get(F);if(Y){let Z=Y[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&S(w),Object.keys(Y).length===0&&d.delete(F)}n.remove(w)}function S(w){let _=n.get(w);i.deleteTexture(_.__webglTexture);let F=w.source,Y=d.get(F);delete Y[_.__cacheKey],a.memory.textures--}function M(w){let _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let Z=0;Z<_.__webglFramebuffer[Y].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Y][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let F=w.textures;for(let Y=0,Z=F.length;Y<Z;Y++){let X=n.get(F[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(F[Y])}n.remove(w)}let I=0;function W(){I=0}function O(){let w=I;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),I+=1,w}function G(w){let _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function $(w,_){let F=n.get(w);if(w.isVideoTexture&&we(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){let Y=w.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,w,_);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function V(w,_){let F=n.get(w);if(w.version>0&&F.__version!==w.version){q(F,w,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function K(w,_){let F=n.get(w);if(w.version>0&&F.__version!==w.version){q(F,w,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function H(w,_){let F=n.get(w);if(w.version>0&&F.__version!==w.version){ee(F,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}let ne={[Hn]:i.REPEAT,[Vi]:i.CLAMP_TO_EDGE,[ar]:i.MIRRORED_REPEAT},he={[Ct]:i.NEAREST,[Sc]:i.NEAREST_MIPMAP_NEAREST,[fs]:i.NEAREST_MIPMAP_LINEAR,[Ot]:i.LINEAR,[ir]:i.LINEAR_MIPMAP_NEAREST,[Ei]:i.LINEAR_MIPMAP_LINEAR},Me={[gm]:i.NEVER,[Mm]:i.ALWAYS,[ym]:i.LESS,[Fd]:i.LEQUAL,[_m]:i.EQUAL,[bm]:i.GEQUAL,[xm]:i.GREATER,[vm]:i.NOTEQUAL};function Be(w,_){if(_.type===ni&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ot||_.magFilter===ir||_.magFilter===fs||_.magFilter===Ei||_.minFilter===Ot||_.minFilter===ir||_.minFilter===fs||_.minFilter===Ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,ne[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ne[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ne[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,he[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,he[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Me[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ct||_.minFilter!==fs&&_.minFilter!==Ei||_.type===ni&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function et(w,_){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",E));let Y=_.source,Z=d.get(Y);Z===void 0&&(Z={},d.set(Y,Z));let X=G(_);if(X!==w.__cacheKey){Z[X]===void 0&&(Z[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Z[X].usedTimes++;let _e=Z[w.__cacheKey];_e!==void 0&&(Z[w.__cacheKey].usedTimes--,_e.usedTimes===0&&S(_)),w.__cacheKey=X,w.__webglTexture=Z[X].texture}return F}function q(w,_,F){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);let Z=et(w,_),X=_.source;t.bindTexture(Y,w.__webglTexture,i.TEXTURE0+F);let _e=n.get(X);if(X.version!==_e.__version||Z===!0){t.activeTexture(i.TEXTURE0+F);let re=Fe.getPrimaries(Fe.workingColorSpace),ue=_.colorSpace===un?null:Fe.getPrimaries(_.colorSpace),Xe=_.colorSpace===un||re===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let J=y(_.image,!1,s.maxTextureSize);J=at(_,J);let de=r.convert(_.format,_.colorSpace),Ee=r.convert(_.type),Re=x(_.internalFormat,de,Ee,_.colorSpace,_.isVideoTexture);Be(Y,_);let fe,Ge=_.mipmaps,Ne=_.isVideoTexture!==!0,it=_e.__version===void 0||Z===!0,L=X.dataReady,ie=P(_,J);if(_.isDepthTexture)Re=v(_.format===Ss,_.type),it&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,Re,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,Re,J.width,J.height,0,de,Ee,null));else if(_.isDataTexture)if(Ge.length>0){Ne&&it&&t.texStorage2D(i.TEXTURE_2D,ie,Re,Ge[0].width,Ge[0].height);for(let z=0,j=Ge.length;z<j;z++)fe=Ge[z],Ne?L&&t.texSubImage2D(i.TEXTURE_2D,z,0,0,fe.width,fe.height,de,Ee,fe.data):t.texImage2D(i.TEXTURE_2D,z,Re,fe.width,fe.height,0,de,Ee,fe.data);_.generateMipmaps=!1}else Ne?(it&&t.texStorage2D(i.TEXTURE_2D,ie,Re,J.width,J.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,de,Ee,J.data)):t.texImage2D(i.TEXTURE_2D,0,Re,J.width,J.height,0,de,Ee,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ne&&it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,Re,Ge[0].width,Ge[0].height,J.depth);for(let z=0,j=Ge.length;z<j;z++)if(fe=Ge[z],_.format!==si)if(de!==null)if(Ne){if(L)if(_.layerUpdates.size>0){let le=sc(fe.width,fe.height,_.format,_.type);for(let ae of _.layerUpdates){let De=fe.data.subarray(ae*le/fe.data.BYTES_PER_ELEMENT,(ae+1)*le/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,ae,fe.width,fe.height,1,de,De)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,0,fe.width,fe.height,J.depth,de,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,z,Re,fe.width,fe.height,J.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,0,fe.width,fe.height,J.depth,de,Ee,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,z,Re,fe.width,fe.height,J.depth,0,de,Ee,fe.data)}else{Ne&&it&&t.texStorage2D(i.TEXTURE_2D,ie,Re,Ge[0].width,Ge[0].height);for(let z=0,j=Ge.length;z<j;z++)fe=Ge[z],_.format!==si?de!==null?Ne?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,z,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,z,Re,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?L&&t.texSubImage2D(i.TEXTURE_2D,z,0,0,fe.width,fe.height,de,Ee,fe.data):t.texImage2D(i.TEXTURE_2D,z,Re,fe.width,fe.height,0,de,Ee,fe.data)}else if(_.isDataArrayTexture)if(Ne){if(it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,Re,J.width,J.height,J.depth),L)if(_.layerUpdates.size>0){let z=sc(J.width,J.height,_.format,_.type);for(let j of _.layerUpdates){let le=J.data.subarray(j*z/J.data.BYTES_PER_ELEMENT,(j+1)*z/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,J.width,J.height,1,de,Ee,le)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,de,Ee,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,J.width,J.height,J.depth,0,de,Ee,J.data);else if(_.isData3DTexture)Ne?(it&&t.texStorage3D(i.TEXTURE_3D,ie,Re,J.width,J.height,J.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,de,Ee,J.data)):t.texImage3D(i.TEXTURE_3D,0,Re,J.width,J.height,J.depth,0,de,Ee,J.data);else if(_.isFramebufferTexture){if(it)if(Ne)t.texStorage2D(i.TEXTURE_2D,ie,Re,J.width,J.height);else{let z=J.width,j=J.height;for(let le=0;le<ie;le++)t.texImage2D(i.TEXTURE_2D,le,Re,z,j,0,de,Ee,null),z>>=1,j>>=1}}else if(Ge.length>0){if(Ne&&it){let z=Te(Ge[0]);t.texStorage2D(i.TEXTURE_2D,ie,Re,z.width,z.height)}for(let z=0,j=Ge.length;z<j;z++)fe=Ge[z],Ne?L&&t.texSubImage2D(i.TEXTURE_2D,z,0,0,de,Ee,fe):t.texImage2D(i.TEXTURE_2D,z,Re,de,Ee,fe);_.generateMipmaps=!1}else if(Ne){if(it){let z=Te(J);t.texStorage2D(i.TEXTURE_2D,ie,Re,z.width,z.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Ee,J)}else t.texImage2D(i.TEXTURE_2D,0,Re,de,Ee,J);g(_)&&p(Y),_e.__version=X.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ee(w,_,F){if(_.image.length!==6)return;let Y=et(w,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+F);let X=n.get(Z);if(Z.version!==X.__version||Y===!0){t.activeTexture(i.TEXTURE0+F);let _e=Fe.getPrimaries(Fe.workingColorSpace),re=_.colorSpace===un?null:Fe.getPrimaries(_.colorSpace),ue=_.colorSpace===un||_e===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let Xe=_.isCompressedTexture||_.image[0].isCompressedTexture,J=_.image[0]&&_.image[0].isDataTexture,de=[];for(let j=0;j<6;j++)!Xe&&!J?de[j]=y(_.image[j],!0,s.maxCubemapSize):de[j]=J?_.image[j].image:_.image[j],de[j]=at(_,de[j]);let Ee=de[0],Re=r.convert(_.format,_.colorSpace),fe=r.convert(_.type),Ge=x(_.internalFormat,Re,fe,_.colorSpace),Ne=_.isVideoTexture!==!0,it=X.__version===void 0||Y===!0,L=Z.dataReady,ie=P(_,Ee);Be(i.TEXTURE_CUBE_MAP,_);let z;if(Xe){Ne&&it&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ie,Ge,Ee.width,Ee.height);for(let j=0;j<6;j++){z=de[j].mipmaps;for(let le=0;le<z.length;le++){let ae=z[le];_.format!==si?Re!==null?Ne?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,le,0,0,ae.width,ae.height,Re,ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,le,Ge,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,le,0,0,ae.width,ae.height,Re,fe,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,le,Ge,ae.width,ae.height,0,Re,fe,ae.data)}}}else{if(z=_.mipmaps,Ne&&it){z.length>0&&ie++;let j=Te(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ie,Ge,j.width,j.height)}for(let j=0;j<6;j++)if(J){Ne?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,de[j].width,de[j].height,Re,fe,de[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ge,de[j].width,de[j].height,0,Re,fe,de[j].data);for(let le=0;le<z.length;le++){let De=z[le].image[j].image;Ne?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,le+1,0,0,De.width,De.height,Re,fe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,le+1,Ge,De.width,De.height,0,Re,fe,De.data)}}else{Ne?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Re,fe,de[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ge,Re,fe,de[j]);for(let le=0;le<z.length;le++){let ae=z[le];Ne?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,le+1,0,0,Re,fe,ae.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,le+1,Ge,Re,fe,ae.image[j])}}}g(_)&&p(i.TEXTURE_CUBE_MAP),X.__version=Z.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ye(w,_,F,Y,Z,X){let _e=r.convert(F.format,F.colorSpace),re=r.convert(F.type),ue=x(F.internalFormat,_e,re,F.colorSpace),Xe=n.get(_),J=n.get(F);if(J.__renderTarget=_,!Xe.__hasExternalTextures){let de=Math.max(1,_.width>>X),Ee=Math.max(1,_.height>>X);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,X,ue,de,Ee,_.depth,0,_e,re,null):t.texImage2D(Z,X,ue,de,Ee,0,_e,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),He(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Z,J.__webglTexture,0,Ve(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Z,J.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function se(w,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){let Y=_.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,X=v(_.stencilBuffer,Z),_e=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=Ve(_);He(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,X,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,X,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,X,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,w)}else{let Y=_.textures;for(let Z=0;Z<Y.length;Z++){let X=Y[Z],_e=r.convert(X.format,X.colorSpace),re=r.convert(X.type),ue=x(X.internalFormat,_e,re,X.colorSpace),Xe=Ve(_);F&&He(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xe,ue,_.width,_.height):He(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xe,ue,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ue,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=n.get(_.depthTexture);Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$(_.depthTexture,0);let Z=Y.__webglTexture,X=Ve(_);if(_.depthTexture.format===gs)He(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(_.depthTexture.format===Ss)He(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Le(w){let _=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){let Y=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){let Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=Y}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ae(_.__webglFramebuffer,w)}else if(F){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),se(_.__webglDepthbuffer[Y],w,!1);else{let Z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,X)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),se(_.__webglDepthbuffer,w,!1);else{let Y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,Z)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(w,_,F){let Y=n.get(w);_!==void 0&&ye(Y.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Le(w)}function ht(w){let _=w.texture,F=n.get(w),Y=n.get(_);w.addEventListener("dispose",A);let Z=w.textures,X=w.isWebGLCubeRenderTarget===!0,_e=Z.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),X){F.__webglFramebuffer=[];for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[re]=[];for(let ue=0;ue<_.mipmaps.length;ue++)F.__webglFramebuffer[re][ue]=i.createFramebuffer()}else F.__webglFramebuffer[re]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let re=0;re<_.mipmaps.length;re++)F.__webglFramebuffer[re]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(_e)for(let re=0,ue=Z.length;re<ue;re++){let Xe=n.get(Z[re]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&He(w)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let re=0;re<Z.length;re++){let ue=Z[re];F.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[re]);let Xe=r.convert(ue.format,ue.colorSpace),J=r.convert(ue.type),de=x(ue.internalFormat,Xe,J,ue.colorSpace,w.isXRRenderTarget===!0),Ee=Ve(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,de,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,F.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),se(F.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Be(i.TEXTURE_CUBE_MAP,_);for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)ye(F.__webglFramebuffer[re][ue],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue);else ye(F.__webglFramebuffer[re],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);g(_)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let re=0,ue=Z.length;re<ue;re++){let Xe=Z[re],J=n.get(Xe);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),Be(i.TEXTURE_2D,Xe),ye(F.__webglFramebuffer,w,Xe,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,0),g(Xe)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(re=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,Y.__webglTexture),Be(re,_),_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)ye(F.__webglFramebuffer[ue],w,_,i.COLOR_ATTACHMENT0,re,ue);else ye(F.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,re,0);g(_)&&p(re),t.unbindTexture()}w.depthBuffer&&Le(w)}function We(w){let _=w.textures;for(let F=0,Y=_.length;F<Y;F++){let Z=_[F];if(g(Z)){let X=T(w),_e=n.get(Z).__webglTexture;t.bindTexture(X,_e),p(X),t.unbindTexture()}}}let pt=[],N=[];function Qt(w){if(w.samples>0){if(He(w)===!1){let _=w.textures,F=w.width,Y=w.height,Z=i.COLOR_BUFFER_BIT,X=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(w),re=_.length>1;if(re)for(let ue=0;ue<_.length;ue++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let ue=0;ue<_.length;ue++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ue]);let Xe=n.get(_[ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xe,0)}i.blitFramebuffer(0,0,F,Y,0,0,F,Y,Z,i.NEAREST),l===!0&&(pt.length=0,N.length=0,pt.push(i.COLOR_ATTACHMENT0+ue),w.depthBuffer&&w.resolveDepthBuffer===!1&&(pt.push(X),N.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let ue=0;ue<_.length;ue++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ue]);let Xe=n.get(_[ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,Xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Ve(w){return Math.min(s.maxSamples,w.samples)}function He(w){let _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function we(w){let _=a.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function at(w,_){let F=w.colorSpace,Y=w.format,Z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==Tt&&F!==un&&(Fe.getTransfer(F)===Qe?(Y!==si||Z!==xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function Te(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=W,this.setTexture2D=$,this.setTexture2DArray=V,this.setTexture3D=K,this.setTextureCube=H,this.rebindTextures=ke,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=He}function Lx(i,e){function t(n,s=un){let r,a=Fe.getTransfer(s);if(n===xi)return i.UNSIGNED_BYTE;if(n===wc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ec)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Rd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ad)return i.BYTE;if(n===Cd)return i.SHORT;if(n===or)return i.UNSIGNED_SHORT;if(n===Tc)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===ni)return i.FLOAT;if(n===_r)return i.HALF_FLOAT;if(n===Pd)return i.ALPHA;if(n===Id)return i.RGB;if(n===si)return i.RGBA;if(n===Ld)return i.LUMINANCE;if(n===Dd)return i.LUMINANCE_ALPHA;if(n===gs)return i.DEPTH_COMPONENT;if(n===Ss)return i.DEPTH_STENCIL;if(n===Za)return i.RED;if(n===Ac)return i.RED_INTEGER;if(n===$a)return i.RG;if(n===Cc)return i.RG_INTEGER;if(n===Ja)return i.RGBA_INTEGER;if(n===ya||n===_a||n===xa||n===va)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ya)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ya)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_l||n===xl||n===vl||n===bl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_l)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===bl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ml||n===Sl||n===Tl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ml||n===Sl)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Tl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wl||n===El||n===Al||n===Cl||n===Rl||n===Pl||n===Il||n===Ll||n===Dl||n===Ul||n===Nl||n===Ol||n===Fl||n===Bl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Al)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Cl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Rl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Il)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ll)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Dl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ul)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ol)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bl)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ba||n===kl||n===zl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ba)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===kl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ud||n===Vl||n===Hl||n===Gl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ba)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Gl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var rc=class extends gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},At=class extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}},Dx={type:"move"},rr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dx)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ux=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ac=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new yt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Jt({vertexShader:Ux,fragmentShader:Nx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},oc=class extends Ht{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,y=new ac,g=t.getContextAttributes(),p=null,T=null,x=[],v=[],P=new ve,E=null,A=new gt;A.viewport=new qe;let R=new gt;R.viewport=new qe;let S=[A,R],M=new rc,I=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ee=x[q];return ee===void 0&&(ee=new rr,x[q]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(q){let ee=x[q];return ee===void 0&&(ee=new rr,x[q]=ee),ee.getGripSpace()},this.getHand=function(q){let ee=x[q];return ee===void 0&&(ee=new rr,x[q]=ee),ee.getHandSpace()};function O(q){let ee=v.indexOf(q.inputSource);if(ee===-1)return;let ye=x[ee];ye!==void 0&&(ye.update(q.inputSource,q.frame,c||a),ye.dispatchEvent({type:q.type,data:q.inputSource}))}function G(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",$);for(let q=0;q<x.length;q++){let ee=v[q];ee!==null&&(v[q]=null,x[q].disconnect(ee))}I=null,W=null,y.reset(),e.setRenderTarget(p),f=null,d=null,u=null,s=null,T=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",G),s.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(P),s.renderState.layers===void 0){let ee={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),T=new ri(f.framebufferWidth,f.framebufferHeight,{format:si,type:xi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ee=null,ye=null,se=null;g.depth&&(se=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=g.stencil?Ss:gs,ye=g.stencil?Ms:Gn);let Ae={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Ae),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new ri(d.textureWidth,d.textureHeight,{format:si,type:xi,depthTexture:new Pa(d.textureWidth,d.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),et.setContext(s),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function $(q){for(let ee=0;ee<q.removed.length;ee++){let ye=q.removed[ee],se=v.indexOf(ye);se>=0&&(v[se]=null,x[se].disconnect(ye))}for(let ee=0;ee<q.added.length;ee++){let ye=q.added[ee],se=v.indexOf(ye);if(se===-1){for(let Le=0;Le<x.length;Le++)if(Le>=v.length){v.push(ye),se=Le;break}else if(v[Le]===null){v[Le]=ye,se=Le;break}if(se===-1)break}let Ae=x[se];Ae&&Ae.connect(ye)}}let V=new C,K=new C;function H(q,ee,ye){V.setFromMatrixPosition(ee.matrixWorld),K.setFromMatrixPosition(ye.matrixWorld);let se=V.distanceTo(K),Ae=ee.projectionMatrix.elements,Le=ye.projectionMatrix.elements,ke=Ae[14]/(Ae[10]-1),ht=Ae[14]/(Ae[10]+1),We=(Ae[9]+1)/Ae[5],pt=(Ae[9]-1)/Ae[5],N=(Ae[8]-1)/Ae[0],Qt=(Le[8]+1)/Le[0],Ve=ke*N,He=ke*Qt,we=se/(-N+Qt),at=we*-N;if(ee.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(at),q.translateZ(we),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ae[10]===-1)q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{let Te=ke+we,w=ht+we,_=Ve-at,F=He+(se-at),Y=We*ht/w*Te,Z=pt*ht/w*Te;q.projectionMatrix.makePerspective(_,F,Y,Z,Te,w),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ne(q,ee){ee===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ee.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let ee=q.near,ye=q.far;y.texture!==null&&(y.depthNear>0&&(ee=y.depthNear),y.depthFar>0&&(ye=y.depthFar)),M.near=R.near=A.near=ee,M.far=R.far=A.far=ye,(I!==M.near||W!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,W=M.far),A.layers.mask=q.layers.mask|2,R.layers.mask=q.layers.mask|4,M.layers.mask=A.layers.mask|R.layers.mask;let se=q.parent,Ae=M.cameras;ne(M,se);for(let Le=0;Le<Ae.length;Le++)ne(Ae[Le],se);Ae.length===2?H(M,A,R):M.projectionMatrix.copy(A.projectionMatrix),he(q,M,se)};function he(q,ee,ye){ye===null?q.matrix.copy(ee.matrixWorld):(q.matrix.copy(ye.matrixWorld),q.matrix.invert(),q.matrix.multiply(ee.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Es*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(M)};let Me=null;function Be(q,ee){if(h=ee.getViewerPose(c||a),m=ee,h!==null){let ye=h.views;f!==null&&(e.setRenderTargetFramebuffer(T,f.framebuffer),e.setRenderTarget(T));let se=!1;ye.length!==M.cameras.length&&(M.cameras.length=0,se=!0);for(let Le=0;Le<ye.length;Le++){let ke=ye[Le],ht=null;if(f!==null)ht=f.getViewport(ke);else{let pt=u.getViewSubImage(d,ke);ht=pt.viewport,Le===0&&(e.setRenderTargetTextures(T,pt.colorTexture,d.ignoreDepthValues?void 0:pt.depthStencilTexture),e.setRenderTarget(T))}let We=S[Le];We===void 0&&(We=new gt,We.layers.enable(Le),We.viewport=new qe,S[Le]=We),We.matrix.fromArray(ke.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(ke.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(ht.x,ht.y,ht.width,ht.height),Le===0&&(M.matrix.copy(We.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),se===!0&&M.cameras.push(We)}let Ae=s.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")){let Le=u.getDepthInformation(ye[0]);Le&&Le.isValid&&Le.texture&&y.init(e,Le,s.renderState)}}for(let ye=0;ye<x.length;ye++){let se=v[ye],Ae=x[ye];se!==null&&Ae!==void 0&&Ae.update(se,ee,c||a)}Me&&Me(q,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),m=null}let et=new Vd;et.setAnimationLoop(Be),this.setAnimationLoop=function(q){Me=q},this.dispose=function(){}}},Bn=new oi,Ox=new ce;function Fx(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,zd(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,T,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,T,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Vt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Vt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let T=e.get(p),x=T.envMap,v=T.envMapRotation;x&&(g.envMap.value=x,Bn.copy(v),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),g.envMapRotation.value.setFromMatrix4(Ox.makeRotationFromEuler(Bn)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,T,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*T,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,T){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let T=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Bx(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,x){let v=x.program;n.uniformBlockBinding(T,v)}function c(T,x){let v=s[T.id];v===void 0&&(m(T),v=h(T),s[T.id]=v,T.addEventListener("dispose",g));let P=x.program;n.updateUBOMapping(T,P);let E=e.render.frame;r[T.id]!==E&&(d(T),r[T.id]=E)}function h(T){let x=u();T.__bindingPointIndex=x;let v=i.createBuffer(),P=T.__size,E=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,P,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,v),v}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){let x=s[T.id],v=T.uniforms,P=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let E=0,A=v.length;E<A;E++){let R=Array.isArray(v[E])?v[E]:[v[E]];for(let S=0,M=R.length;S<M;S++){let I=R[S];if(f(I,E,S,P)===!0){let W=I.__offset,O=Array.isArray(I.value)?I.value:[I.value],G=0;for(let $=0;$<O.length;$++){let V=O[$],K=y(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,W+G,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,G),G+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,x,v,P){let E=T.value,A=x+"_"+v;if(P[A]===void 0)return typeof E=="number"||typeof E=="boolean"?P[A]=E:P[A]=E.clone(),!0;{let R=P[A];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return P[A]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function m(T){let x=T.uniforms,v=0,P=16;for(let A=0,R=x.length;A<R;A++){let S=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,I=S.length;M<I;M++){let W=S[M],O=Array.isArray(W.value)?W.value:[W.value];for(let G=0,$=O.length;G<$;G++){let V=O[G],K=y(V),H=v%P,ne=H%K.boundary,he=H+ne;v+=ne,he!==0&&P-he<K.storage&&(v+=P-he),W.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=v,v+=K.storage}}}let E=v%P;return E>0&&(v+=P-E),T.__size=v,T.__cache={},this}function y(T){let x={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(x.boundary=4,x.storage=4):T.isVector2?(x.boundary=8,x.storage=8):T.isVector3||T.isColor?(x.boundary=16,x.storage=12):T.isVector4?(x.boundary=16,x.storage=16):T.isMatrix3?(x.boundary=48,x.storage=48):T.isMatrix4?(x.boundary=64,x.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),x}function g(T){let x=T.target;x.removeEventListener("dispose",g);let v=a.indexOf(x.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(let T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}var Cs=class{constructor(e={}){let{canvas:t=km(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let m=new Uint32Array(4),y=new Int32Array(4),g=null,p=null,T=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rt,this.toneMapping=mn,this.toneMappingExposure=1;let v=this,P=!1,E=0,A=0,R=null,S=-1,M=null,I=new qe,W=new qe,O=null,G=new Se(0),$=0,V=t.width,K=t.height,H=1,ne=null,he=null,Me=new qe(0,0,V,K),Be=new qe(0,0,V,K),et=!1,q=new gn,ee=!1,ye=!1,se=new ce,Ae=new ce,Le=new C,ke=new qe,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},We=!1;function pt(){return R===null?H:1}let N=n;function Qt(b,D){return t.getContext(b,D)}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ae,!1),N===null){let D="webgl2";if(N=Qt(D,b),N===null)throw Qt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ve,He,we,at,Te,w,_,F,Y,Z,X,_e,re,ue,Xe,J,de,Ee,Re,fe,Ge,Ne,it,L;function ie(){Ve=new J_(N),Ve.init(),Ne=new Lx(N,Ve),He=new X_(N,Ve,e,Ne),we=new Ex(N,Ve),He.reverseDepthBuffer&&d&&we.buffers.depth.setReversed(!0),at=new e0(N),Te=new fx,w=new Ix(N,Ve,we,Te,He,Ne,at),_=new Y_(v),F=new $_(v),Y=new og(N),it=new G_(N,Y),Z=new K_(N,Y,at,it),X=new i0(N,Z,Y,at),Re=new t0(N,He,w),J=new q_(Te),_e=new dx(v,_,F,Ve,He,it,J),re=new Fx(v,Te),ue=new mx,Xe=new bx(Ve),Ee=new H_(v,_,F,we,X,f,l),de=new Tx(v,X,He),L=new Bx(N,at,He,we),fe=new W_(N,Ve,at),Ge=new Q_(N,Ve,at),at.programs=_e.programs,v.capabilities=He,v.extensions=Ve,v.properties=Te,v.renderLists=ue,v.shadowMap=de,v.state=we,v.info=at}ie();let z=new oc(v,N);this.xr=z,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let b=Ve.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Ve.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(b){b!==void 0&&(H=b,this.setSize(V,K,!1))},this.getSize=function(b){return b.set(V,K)},this.setSize=function(b,D,B=!0){if(z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=b,K=D,t.width=Math.floor(b*H),t.height=Math.floor(D*H),B===!0&&(t.style.width=b+"px",t.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(V*H,K*H).floor()},this.setDrawingBufferSize=function(b,D,B){V=b,K=D,H=B,t.width=Math.floor(b*B),t.height=Math.floor(D*B),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(Me)},this.setViewport=function(b,D,B,k){b.isVector4?Me.set(b.x,b.y,b.z,b.w):Me.set(b,D,B,k),we.viewport(I.copy(Me).multiplyScalar(H).round())},this.getScissor=function(b){return b.copy(Be)},this.setScissor=function(b,D,B,k){b.isVector4?Be.set(b.x,b.y,b.z,b.w):Be.set(b,D,B,k),we.scissor(W.copy(Be).multiplyScalar(H).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(b){we.setScissorTest(et=b)},this.setOpaqueSort=function(b){ne=b},this.setTransparentSort=function(b){he=b},this.getClearColor=function(b){return b.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor.apply(Ee,arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha.apply(Ee,arguments)},this.clear=function(b=!0,D=!0,B=!0){let k=0;if(b){let U=!1;if(R!==null){let Q=R.texture.format;U=Q===Ja||Q===Cc||Q===Ac}if(U){let Q=R.texture.type,oe=Q===xi||Q===Gn||Q===or||Q===Ms||Q===wc||Q===Ec,pe=Ee.getClearColor(),me=Ee.getClearAlpha(),Ie=pe.r,Ue=pe.g,ge=pe.b;oe?(m[0]=Ie,m[1]=Ue,m[2]=ge,m[3]=me,N.clearBufferuiv(N.COLOR,0,m)):(y[0]=Ie,y[1]=Ue,y[2]=ge,y[3]=me,N.clearBufferiv(N.COLOR,0,y))}else k|=N.COLOR_BUFFER_BIT}D&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),ue.dispose(),Xe.dispose(),Te.dispose(),_.dispose(),F.dispose(),X.dispose(),it.dispose(),L.dispose(),_e.dispose(),z.dispose(),z.removeEventListener("sessionstart",Zh),z.removeEventListener("sessionend",$h),Ln.stop()};function j(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let b=at.autoReset,D=de.enabled,B=de.autoUpdate,k=de.needsUpdate,U=de.type;ie(),at.autoReset=b,de.enabled=D,de.autoUpdate=B,de.needsUpdate=k,de.type=U}function ae(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function De(b){let D=b.target;D.removeEventListener("dispose",De),dt(D)}function dt(b){Pt(b),Te.remove(b)}function Pt(b){let D=Te.get(b).programs;D!==void 0&&(D.forEach(function(B){_e.releaseProgram(B)}),b.isShaderMaterial&&_e.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,B,k,U,Q){D===null&&(D=ht);let oe=U.isMesh&&U.matrixWorld.determinant()<0,pe=Np(b,D,B,k,U);we.setMaterial(k,oe);let me=B.index,Ie=1;if(k.wireframe===!0){if(me=Z.getWireframeAttribute(B),me===void 0)return;Ie=2}let Ue=B.drawRange,ge=B.attributes.position,Ye=Ue.start*Ie,nt=(Ue.start+Ue.count)*Ie;Q!==null&&(Ye=Math.max(Ye,Q.start*Ie),nt=Math.min(nt,(Q.start+Q.count)*Ie)),me!==null?(Ye=Math.max(Ye,0),nt=Math.min(nt,me.count)):ge!=null&&(Ye=Math.max(Ye,0),nt=Math.min(nt,ge.count));let ot=nt-Ye;if(ot<0||ot===1/0)return;it.setup(U,k,pe,B,me);let zt,Ze=fe;if(me!==null&&(zt=Y.get(me),Ze=Ge,Ze.setIndex(zt)),U.isMesh)k.wireframe===!0?(we.setLineWidth(k.wireframeLinewidth*pt()),Ze.setMode(N.LINES)):Ze.setMode(N.TRIANGLES);else if(U.isLine){let xe=k.linewidth;xe===void 0&&(xe=1),we.setLineWidth(xe*pt()),U.isLineSegments?Ze.setMode(N.LINES):U.isLineLoop?Ze.setMode(N.LINE_LOOP):Ze.setMode(N.LINE_STRIP)}else U.isPoints?Ze.setMode(N.POINTS):U.isSprite&&Ze.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Ze.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))Ze.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let xe=U._multiDrawStarts,Di=U._multiDrawCounts,$e=U._multiDrawCount,di=me?Y.get(me).bytesPerElement:1,Jn=Te.get(k).currentProgram.getUniforms();for(let qt=0;qt<$e;qt++)Jn.setValue(N,"_gl_DrawID",qt),Ze.render(xe[qt]/di,Di[qt])}else if(U.isInstancedMesh)Ze.renderInstances(Ye,ot,U.count);else if(B.isInstancedBufferGeometry){let xe=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Di=Math.min(B.instanceCount,xe);Ze.renderInstances(Ye,ot,Di)}else Ze.render(Ye,ot)};function Je(b,D,B){b.transparent===!0&&b.side===ii&&b.forceSinglePass===!1?(b.side=Vt,b.needsUpdate=!0,Gr(b,D,B),b.side=Ai,b.needsUpdate=!0,Gr(b,D,B),b.side=ii):Gr(b,D,B)}this.compile=function(b,D,B=null){B===null&&(B=b),p=Xe.get(B),p.init(D),x.push(p),B.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),b!==B&&b.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();let k=new Set;return b.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let Q=U.material;if(Q)if(Array.isArray(Q))for(let oe=0;oe<Q.length;oe++){let pe=Q[oe];Je(pe,B,U),k.add(pe)}else Je(Q,B,U),k.add(Q)}),x.pop(),p=null,k},this.compileAsync=function(b,D,B=null){let k=this.compile(b,D,B);return new Promise(U=>{function Q(){if(k.forEach(function(oe){Te.get(oe).currentProgram.isReady()&&k.delete(oe)}),k.size===0){U(b);return}setTimeout(Q,10)}Ve.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let ui=null;function Li(b){ui&&ui(b)}function Zh(){Ln.stop()}function $h(){Ln.start()}let Ln=new Vd;Ln.setAnimationLoop(Li),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(b){ui=b,z.setAnimationLoop(b),b===null?Ln.stop():Ln.start()},z.addEventListener("sessionstart",Zh),z.addEventListener("sessionend",$h),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),z.enabled===!0&&z.isPresenting===!0&&(z.cameraAutoUpdate===!0&&z.updateCamera(D),D=z.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,D,R),p=Xe.get(b,x.length),p.init(D),x.push(p),Ae.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),q.setFromProjectionMatrix(Ae),ye=this.localClippingEnabled,ee=J.init(this.clippingPlanes,ye),g=ue.get(b,T.length),g.init(),T.push(g),z.enabled===!0&&z.isPresenting===!0){let Q=v.xr.getDepthSensingMesh();Q!==null&&Ro(Q,D,-1/0,v.sortObjects)}Ro(b,D,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(ne,he),We=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,We&&Ee.addToRenderList(g,b),this.info.render.frame++,ee===!0&&J.beginShadows();let B=p.state.shadowsArray;de.render(B,b,D),ee===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();let k=g.opaque,U=g.transmissive;if(p.setupLights(),D.isArrayCamera){let Q=D.cameras;if(U.length>0)for(let oe=0,pe=Q.length;oe<pe;oe++){let me=Q[oe];Kh(k,U,b,me)}We&&Ee.render(b);for(let oe=0,pe=Q.length;oe<pe;oe++){let me=Q[oe];Jh(g,b,me,me.viewport)}}else U.length>0&&Kh(k,U,b,D),We&&Ee.render(b),Jh(g,b,D);R!==null&&(w.updateMultisampleRenderTarget(R),w.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(v,b,D),it.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(p=x[x.length-1],ee===!0&&J.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?g=T[T.length-1]:g=null};function Ro(b,D,B,k){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||q.intersectsSprite(b)){k&&ke.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ae);let oe=X.update(b),pe=b.material;pe.visible&&g.push(b,oe,pe,B,ke.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||q.intersectsObject(b))){let oe=X.update(b),pe=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ke.copy(b.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),ke.copy(oe.boundingSphere.center)),ke.applyMatrix4(b.matrixWorld).applyMatrix4(Ae)),Array.isArray(pe)){let me=oe.groups;for(let Ie=0,Ue=me.length;Ie<Ue;Ie++){let ge=me[Ie],Ye=pe[ge.materialIndex];Ye&&Ye.visible&&g.push(b,oe,Ye,B,ke.z,ge)}}else pe.visible&&g.push(b,oe,pe,B,ke.z,null)}}let Q=b.children;for(let oe=0,pe=Q.length;oe<pe;oe++)Ro(Q[oe],D,B,k)}function Jh(b,D,B,k){let U=b.opaque,Q=b.transmissive,oe=b.transparent;p.setupLightsView(B),ee===!0&&J.setGlobalState(v.clippingPlanes,B),k&&we.viewport(I.copy(k)),U.length>0&&Hr(U,D,B),Q.length>0&&Hr(Q,D,B),oe.length>0&&Hr(oe,D,B),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function Kh(b,D,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new ri(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?_r:xi,minFilter:Ei,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Fe.workingColorSpace}));let Q=p.state.transmissionRenderTarget[k.id],oe=k.viewport||I;Q.setSize(oe.z,oe.w);let pe=v.getRenderTarget();v.setRenderTarget(Q),v.getClearColor(G),$=v.getClearAlpha(),$<1&&v.setClearColor(16777215,.5),v.clear(),We&&Ee.render(B);let me=v.toneMapping;v.toneMapping=mn;let Ie=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),ee===!0&&J.setGlobalState(v.clippingPlanes,k),Hr(b,B,k),w.updateMultisampleRenderTarget(Q),w.updateRenderTargetMipmap(Q),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let ge=0,Ye=D.length;ge<Ye;ge++){let nt=D[ge],ot=nt.object,zt=nt.geometry,Ze=nt.material,xe=nt.group;if(Ze.side===ii&&ot.layers.test(k.layers)){let Di=Ze.side;Ze.side=Vt,Ze.needsUpdate=!0,Qh(ot,B,k,zt,Ze,xe),Ze.side=Di,Ze.needsUpdate=!0,Ue=!0}}Ue===!0&&(w.updateMultisampleRenderTarget(Q),w.updateRenderTargetMipmap(Q))}v.setRenderTarget(pe),v.setClearColor(G,$),Ie!==void 0&&(k.viewport=Ie),v.toneMapping=me}function Hr(b,D,B){let k=D.isScene===!0?D.overrideMaterial:null;for(let U=0,Q=b.length;U<Q;U++){let oe=b[U],pe=oe.object,me=oe.geometry,Ie=k===null?oe.material:k,Ue=oe.group;pe.layers.test(B.layers)&&Qh(pe,D,B,me,Ie,Ue)}}function Qh(b,D,B,k,U,Q){b.onBeforeRender(v,D,B,k,U,Q),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),U.onBeforeRender(v,D,B,k,b,Q),U.transparent===!0&&U.side===ii&&U.forceSinglePass===!1?(U.side=Vt,U.needsUpdate=!0,v.renderBufferDirect(B,D,k,U,b,Q),U.side=Ai,U.needsUpdate=!0,v.renderBufferDirect(B,D,k,U,b,Q),U.side=ii):v.renderBufferDirect(B,D,k,U,b,Q),b.onAfterRender(v,D,B,k,U,Q)}function Gr(b,D,B){D.isScene!==!0&&(D=ht);let k=Te.get(b),U=p.state.lights,Q=p.state.shadowsArray,oe=U.state.version,pe=_e.getParameters(b,U.state,Q,D,B),me=_e.getProgramCacheKey(pe),Ie=k.programs;k.environment=b.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(b.isMeshStandardMaterial?F:_).get(b.envMap||k.environment),k.envMapRotation=k.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Ie===void 0&&(b.addEventListener("dispose",De),Ie=new Map,k.programs=Ie);let Ue=Ie.get(me);if(Ue!==void 0){if(k.currentProgram===Ue&&k.lightsStateVersion===oe)return tu(b,pe),Ue}else pe.uniforms=_e.getUniforms(b),b.onBeforeCompile(pe,v),Ue=_e.acquireProgram(pe,me),Ie.set(me,Ue),k.uniforms=pe.uniforms;let ge=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ge.clippingPlanes=J.uniform),tu(b,pe),k.needsLights=Fp(b),k.lightsStateVersion=oe,k.needsLights&&(ge.ambientLightColor.value=U.state.ambient,ge.lightProbe.value=U.state.probe,ge.directionalLights.value=U.state.directional,ge.directionalLightShadows.value=U.state.directionalShadow,ge.spotLights.value=U.state.spot,ge.spotLightShadows.value=U.state.spotShadow,ge.rectAreaLights.value=U.state.rectArea,ge.ltc_1.value=U.state.rectAreaLTC1,ge.ltc_2.value=U.state.rectAreaLTC2,ge.pointLights.value=U.state.point,ge.pointLightShadows.value=U.state.pointShadow,ge.hemisphereLights.value=U.state.hemi,ge.directionalShadowMap.value=U.state.directionalShadowMap,ge.directionalShadowMatrix.value=U.state.directionalShadowMatrix,ge.spotShadowMap.value=U.state.spotShadowMap,ge.spotLightMatrix.value=U.state.spotLightMatrix,ge.spotLightMap.value=U.state.spotLightMap,ge.pointShadowMap.value=U.state.pointShadowMap,ge.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=Ue,k.uniformsList=null,Ue}function eu(b){if(b.uniformsList===null){let D=b.currentProgram.getUniforms();b.uniformsList=_s.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function tu(b,D){let B=Te.get(b);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.batchingColor=D.batchingColor,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function Np(b,D,B,k,U){D.isScene!==!0&&(D=ht),w.resetTextureUnits();let Q=D.fog,oe=k.isMeshStandardMaterial?D.environment:null,pe=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Tt,me=(k.isMeshStandardMaterial?F:_).get(k.envMap||oe),Ie=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ue=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),ge=!!B.morphAttributes.position,Ye=!!B.morphAttributes.normal,nt=!!B.morphAttributes.color,ot=mn;k.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ot=v.toneMapping);let zt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ze=zt!==void 0?zt.length:0,xe=Te.get(k),Di=p.state.lights;if(ee===!0&&(ye===!0||b!==M)){let ei=b===M&&k.id===S;J.setState(k,b,ei)}let $e=!1;k.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Di.state.version||xe.outputColorSpace!==pe||U.isBatchedMesh&&xe.batching===!1||!U.isBatchedMesh&&xe.batching===!0||U.isBatchedMesh&&xe.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&xe.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&xe.instancing===!1||!U.isInstancedMesh&&xe.instancing===!0||U.isSkinnedMesh&&xe.skinning===!1||!U.isSkinnedMesh&&xe.skinning===!0||U.isInstancedMesh&&xe.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&xe.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&xe.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&xe.instancingMorph===!1&&U.morphTexture!==null||xe.envMap!==me||k.fog===!0&&xe.fog!==Q||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==J.numPlanes||xe.numIntersection!==J.numIntersection)||xe.vertexAlphas!==Ie||xe.vertexTangents!==Ue||xe.morphTargets!==ge||xe.morphNormals!==Ye||xe.morphColors!==nt||xe.toneMapping!==ot||xe.morphTargetsCount!==Ze)&&($e=!0):($e=!0,xe.__version=k.version);let di=xe.currentProgram;$e===!0&&(di=Gr(k,D,U));let Jn=!1,qt=!1,Ws=!1,lt=di.getUniforms(),Ti=xe.uniforms;if(we.useProgram(di.program)&&(Jn=!0,qt=!0,Ws=!0),k.id!==S&&(S=k.id,qt=!0),Jn||M!==b){we.buffers.depth.getReversed()?(se.copy(b.projectionMatrix),Vm(se),Hm(se),lt.setValue(N,"projectionMatrix",se)):lt.setValue(N,"projectionMatrix",b.projectionMatrix),lt.setValue(N,"viewMatrix",b.matrixWorldInverse);let nn=lt.map.cameraPosition;nn!==void 0&&nn.setValue(N,Le.setFromMatrixPosition(b.matrixWorld)),He.logarithmicDepthBuffer&&lt.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&lt.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,qt=!0,Ws=!0)}if(U.isSkinnedMesh){lt.setOptional(N,U,"bindMatrix"),lt.setOptional(N,U,"bindMatrixInverse");let ei=U.skeleton;ei&&(ei.boneTexture===null&&ei.computeBoneTexture(),lt.setValue(N,"boneTexture",ei.boneTexture,w))}U.isBatchedMesh&&(lt.setOptional(N,U,"batchingTexture"),lt.setValue(N,"batchingTexture",U._matricesTexture,w),lt.setOptional(N,U,"batchingIdTexture"),lt.setValue(N,"batchingIdTexture",U._indirectTexture,w),lt.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&lt.setValue(N,"batchingColorTexture",U._colorsTexture,w));let Xs=B.morphAttributes;if((Xs.position!==void 0||Xs.normal!==void 0||Xs.color!==void 0)&&Re.update(U,B,di),(qt||xe.receiveShadow!==U.receiveShadow)&&(xe.receiveShadow=U.receiveShadow,lt.setValue(N,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Ti.envMap.value=me,Ti.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&D.environment!==null&&(Ti.envMapIntensity.value=D.environmentIntensity),qt&&(lt.setValue(N,"toneMappingExposure",v.toneMappingExposure),xe.needsLights&&Op(Ti,Ws),Q&&k.fog===!0&&re.refreshFogUniforms(Ti,Q),re.refreshMaterialUniforms(Ti,k,H,K,p.state.transmissionRenderTarget[b.id]),_s.upload(N,eu(xe),Ti,w)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(_s.upload(N,eu(xe),Ti,w),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&lt.setValue(N,"center",U.center),lt.setValue(N,"modelViewMatrix",U.modelViewMatrix),lt.setValue(N,"normalMatrix",U.normalMatrix),lt.setValue(N,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let ei=k.uniformsGroups;for(let nn=0,sn=ei.length;nn<sn;nn++){let iu=ei[nn];L.update(iu,di),L.bind(iu,di)}}return di}function Op(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function Fp(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,D,B){Te.get(b.texture).__webglTexture=D,Te.get(b.depthTexture).__webglTexture=B;let k=Te.get(b);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,D){let B=Te.get(b);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,B=0){R=b,E=D,A=B;let k=!0,U=null,Q=!1,oe=!1;if(b){let me=Te.get(b);if(me.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(N.FRAMEBUFFER,null),k=!1;else if(me.__webglFramebuffer===void 0)w.setupRenderTarget(b);else if(me.__hasExternalTextures)w.rebindTextures(b,Te.get(b.texture).__webglTexture,Te.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let ge=b.depthTexture;if(me.__boundDepthTexture!==ge){if(ge!==null&&Te.has(ge)&&(b.width!==ge.image.width||b.height!==ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(b)}}let Ie=b.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(oe=!0);let Ue=Te.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ue[D])?U=Ue[D][B]:U=Ue[D],Q=!0):b.samples>0&&w.useMultisampledRTT(b)===!1?U=Te.get(b).__webglMultisampledFramebuffer:Array.isArray(Ue)?U=Ue[B]:U=Ue,I.copy(b.viewport),W.copy(b.scissor),O=b.scissorTest}else I.copy(Me).multiplyScalar(H).floor(),W.copy(Be).multiplyScalar(H).floor(),O=et;if(we.bindFramebuffer(N.FRAMEBUFFER,U)&&k&&we.drawBuffers(b,U),we.viewport(I),we.scissor(W),we.setScissorTest(O),Q){let me=Te.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,me.__webglTexture,B)}else if(oe){let me=Te.get(b.texture),Ie=D||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,me.__webglTexture,B||0,Ie)}S=-1},this.readRenderTargetPixels=function(b,D,B,k,U,Q,oe){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=Te.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&oe!==void 0&&(pe=pe[oe]),pe){we.bindFramebuffer(N.FRAMEBUFFER,pe);try{let me=b.texture,Ie=me.format,Ue=me.type;if(!He.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-k&&B>=0&&B<=b.height-U&&N.readPixels(D,B,k,U,Ne.convert(Ie),Ne.convert(Ue),Q)}finally{let me=R!==null?Te.get(R).__webglFramebuffer:null;we.bindFramebuffer(N.FRAMEBUFFER,me)}}},this.readRenderTargetPixelsAsync=async function(b,D,B,k,U,Q,oe){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=Te.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&oe!==void 0&&(pe=pe[oe]),pe){let me=b.texture,Ie=me.format,Ue=me.type;if(!He.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=b.width-k&&B>=0&&B<=b.height-U){we.bindFramebuffer(N.FRAMEBUFFER,pe);let ge=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ge),N.bufferData(N.PIXEL_PACK_BUFFER,Q.byteLength,N.STREAM_READ),N.readPixels(D,B,k,U,Ne.convert(Ie),Ne.convert(Ue),0);let Ye=R!==null?Te.get(R).__webglFramebuffer:null;we.bindFramebuffer(N.FRAMEBUFFER,Ye);let nt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await zm(N,nt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ge),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Q),N.deleteBuffer(ge),N.deleteSync(nt),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,D=null,B=0){b.isTexture!==!0&&(er("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,b=arguments[1]);let k=Math.pow(2,-B),U=Math.floor(b.image.width*k),Q=Math.floor(b.image.height*k),oe=D!==null?D.x:0,pe=D!==null?D.y:0;w.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,oe,pe,U,Q),we.unbindTexture()},this.copyTextureToTexture=function(b,D,B=null,k=null,U=0){b.isTexture!==!0&&(er("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,b=arguments[1],D=arguments[2],U=arguments[3]||0,B=null);let Q,oe,pe,me,Ie,Ue,ge,Ye,nt,ot=b.isCompressedTexture?b.mipmaps[U]:b.image;B!==null?(Q=B.max.x-B.min.x,oe=B.max.y-B.min.y,pe=B.isBox3?B.max.z-B.min.z:1,me=B.min.x,Ie=B.min.y,Ue=B.isBox3?B.min.z:0):(Q=ot.width,oe=ot.height,pe=ot.depth||1,me=0,Ie=0,Ue=0),k!==null?(ge=k.x,Ye=k.y,nt=k.z):(ge=0,Ye=0,nt=0);let zt=Ne.convert(D.format),Ze=Ne.convert(D.type),xe;D.isData3DTexture?(w.setTexture3D(D,0),xe=N.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(w.setTexture2DArray(D,0),xe=N.TEXTURE_2D_ARRAY):(w.setTexture2D(D,0),xe=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);let Di=N.getParameter(N.UNPACK_ROW_LENGTH),$e=N.getParameter(N.UNPACK_IMAGE_HEIGHT),di=N.getParameter(N.UNPACK_SKIP_PIXELS),Jn=N.getParameter(N.UNPACK_SKIP_ROWS),qt=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ot.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ot.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,me),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ie),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ue);let Ws=b.isDataArrayTexture||b.isData3DTexture,lt=D.isDataArrayTexture||D.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){let Ti=Te.get(b),Xs=Te.get(D),ei=Te.get(Ti.__renderTarget),nn=Te.get(Xs.__renderTarget);we.bindFramebuffer(N.READ_FRAMEBUFFER,ei.__webglFramebuffer),we.bindFramebuffer(N.DRAW_FRAMEBUFFER,nn.__webglFramebuffer);for(let sn=0;sn<pe;sn++)Ws&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Te.get(b).__webglTexture,U,Ue+sn),b.isDepthTexture?(lt&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Te.get(D).__webglTexture,U,nt+sn),N.blitFramebuffer(me,Ie,Q,oe,ge,Ye,Q,oe,N.DEPTH_BUFFER_BIT,N.NEAREST)):lt?N.copyTexSubImage3D(xe,U,ge,Ye,nt+sn,me,Ie,Q,oe):N.copyTexSubImage2D(xe,U,ge,Ye,nt+sn,me,Ie,Q,oe);we.bindFramebuffer(N.READ_FRAMEBUFFER,null),we.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else lt?b.isDataTexture||b.isData3DTexture?N.texSubImage3D(xe,U,ge,Ye,nt,Q,oe,pe,zt,Ze,ot.data):D.isCompressedArrayTexture?N.compressedTexSubImage3D(xe,U,ge,Ye,nt,Q,oe,pe,zt,ot.data):N.texSubImage3D(xe,U,ge,Ye,nt,Q,oe,pe,zt,Ze,ot):b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,ge,Ye,Q,oe,zt,Ze,ot.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,ge,Ye,ot.width,ot.height,zt,ot.data):N.texSubImage2D(N.TEXTURE_2D,U,ge,Ye,Q,oe,zt,Ze,ot);N.pixelStorei(N.UNPACK_ROW_LENGTH,Di),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,$e),N.pixelStorei(N.UNPACK_SKIP_PIXELS,di),N.pixelStorei(N.UNPACK_SKIP_ROWS,Jn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,qt),U===0&&D.generateMipmaps&&N.generateMipmap(xe),we.unbindTexture()},this.copyTextureToTexture3D=function(b,D,B=null,k=null,U=0){return b.isTexture!==!0&&(er("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,b=arguments[2],D=arguments[3],U=arguments[4]||0),er('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,D,B,k,U)},this.initRenderTarget=function(b){Te.get(b).__webglFramebuffer===void 0&&w.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?w.setTextureCube(b,0):b.isData3DTexture?w.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?w.setTexture2DArray(b,0):w.setTexture2D(b,0),we.unbindTexture()},this.resetState=function(){E=0,A=0,R=null,we.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Fe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Fe._getUnpackColorSpace()}};var Ia=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Se(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},La=class extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},ur=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Wl,this.updateRanges=[],this.version=0,this.uuid=_i()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ut=new C,dr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new je(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var nd=new C,sd=new qe,rd=new qe,kx=new C,ad=new ce,ha=new C,nl=new St,od=new ce,sl=new ai,Da=class extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ou,this.bindMatrix=new ce,this.bindMatrixInverse=new ce,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Dt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ha),this.boundingBox.expandByPoint(ha)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new St),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ha),this.boundingSphere.expandByPoint(ha)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nl.copy(this.boundingSphere),nl.applyMatrix4(s),e.ray.intersectsSphere(nl)!==!1&&(od.copy(s).invert(),sl.copy(e.ray).applyMatrix4(od),!(this.boundingBox!==null&&sl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,sl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new qe,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ou?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===um?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;sd.fromBufferAttribute(s.attributes.skinIndex,e),rd.fromBufferAttribute(s.attributes.skinWeight,e),nd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=rd.getComponent(r);if(a!==0){let o=sd.getComponent(r);ad.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(kx.copy(nd).applyMatrix4(ad),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},fr=class extends ut{constructor(){super(),this.isBone=!0,this.type="Bone"}},Wn=class extends yt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Ct,h=Ct,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ld=new ce,zx=new ce,Ua=class i{constructor(e=[],t=[]){this.uuid=_i(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ce)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ce;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:zx;ld.multiplyMatrices(o,t[r]),ld.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Wn(t,e,e,si,ni);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new fr),this.bones.push(a),this.boneInverses.push(new ce().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Xn=class extends je{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ds=new ce,cd=new ce,ua=[],hd=new Dt,Vx=new ce,$s=new ct,Js=new St,Rs=class extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Vx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Dt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),hd.copy(e.boundingBox).applyMatrix4(ds),this.boundingBox.union(hd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new St),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),Js.copy(e.boundingSphere).applyMatrix4(ds),this.boundingSphere.union(Js)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Js.copy(this.boundingSphere),Js.applyMatrix4(n),e.ray.intersectsSphere(Js)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ds),cd.multiplyMatrices(n,ds),$s.matrixWorld=cd,$s.raycast(e,ua);for(let a=0,o=ua.length;a<o;a++){let l=ua[a];l.instanceId=r,l.object=this,t.push(l)}ua.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Wn(new Float32Array(s*this.count),s,this.count,Za,ni));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Ps=class extends Zt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Na=new C,Oa=new C,ud=new ce,Ks=new ai,da=new St,rl=new C,dd=new C,Is=class extends ut{constructor(e=new _t,t=new Ps){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Na.fromBufferAttribute(t,s-1),Oa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Na.distanceTo(Oa);e.setAttribute("lineDistance",new Ft(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),da.copy(n.boundingSphere),da.applyMatrix4(s),da.radius+=r,e.ray.intersectsSphere(da)===!1)return;ud.copy(s).invert(),Ks.copy(e.ray).applyMatrix4(ud);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=c){let p=h.getX(y),T=h.getX(y+1),x=fa(this,e,Ks,l,p,T);x&&t.push(x)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(f),p=fa(this,e,Ks,l,y,g);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=c){let p=fa(this,e,Ks,l,y,y+1);p&&t.push(p)}if(this.isLineLoop){let y=fa(this,e,Ks,l,m-1,f);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function fa(i,e,t,n,s,r){let a=i.geometry.attributes.position;if(Na.fromBufferAttribute(a,s),Oa.fromBufferAttribute(a,r),t.distanceSqToSegment(Na,Oa,rl,dd)>n)return;rl.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(rl);if(!(l<e.near||l>e.far))return{distance:l,point:dd.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var fd=new C,pd=new C,pr=class extends Is{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)fd.fromBufferAttribute(t,s),pd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+fd.distanceTo(pd);e.setAttribute("lineDistance",new Ft(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Fa=class extends Is{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},_n=class extends Zt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},md=new ce,lc=new ai,pa=new St,ma=new C,qn=class extends ut{constructor(e=new _t,t=new _n){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(s),pa.radius+=r,e.ray.intersectsSphere(pa)===!1)return;md.copy(s).invert(),lc.copy(e.ray).applyMatrix4(md);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,y=f;m<y;m++){let g=c.getX(m);ma.fromBufferAttribute(u,g),gd(ma,g,l,s,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,y=f;m<y;m++)ma.fromBufferAttribute(u,m),gd(ma,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function gd(i,e,t,n,s,r,a){let o=lc.distanceSqToPoint(i);if(o<t){let l=new C;lc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var mr=class extends yt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var vi=class extends Zt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Od,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Kt=class extends vi{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Et(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function ga(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Hx(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Gx(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function yd(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function qd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var xn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];i:{e:{let a;t:{n:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break n;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break i}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},cc=class extends xn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:lu,endingEnd:lu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case cu:r=e,o=2*t-n;break;case hu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case cu:a=e,l=2*n-t;break;case hu:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),y=m*m,g=y*m,p=-d*g+2*d*y-d*m,T=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*m+1,x=(-1-f)*g+(1.5+f)*y+.5*m,v=f*g-f*y;for(let P=0;P!==o;++P)r[P]=p*a[h+P]+T*a[c+P]+x*a[l+P]+v*a[u+P];return r}},hc=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},uc=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},li=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ga(t,this.TimeBufferType),this.values=ga(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ga(e.times,Array),values:ga(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new uc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new cc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ts:t=this.InterpolantFactoryMethodDiscrete;break;case ws:t=this.InterpolantFactoryMethodLinear;break;case Po:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ts;case this.InterpolantFactoryMethodLinear:return ws;case this.InterpolantFactoryMethodSmooth:return Po}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Hx(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Po,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let y=t[u+m];if(y!==t[d+m]||y!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};li.prototype.TimeBufferType=Float32Array;li.prototype.ValueBufferType=Float32Array;li.prototype.DefaultInterpolation=ws;var vn=class extends li{constructor(e,t,n){super(e,t,n)}};vn.prototype.ValueTypeName="bool";vn.prototype.ValueBufferType=Array;vn.prototype.DefaultInterpolation=Ts;vn.prototype.InterpolantFactoryMethodLinear=void 0;vn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ba=class extends li{};Ba.prototype.ValueTypeName="color";var qi=class extends li{};qi.prototype.ValueTypeName="number";var dc=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)Rt.slerpFlat(r,0,a,c-o,a,c,l);return r}},Yi=class extends li{InterpolantFactoryMethodLinear(e){return new dc(this.times,this.values,this.getValueSize(),e)}};Yi.prototype.ValueTypeName="quaternion";Yi.prototype.InterpolantFactoryMethodSmooth=void 0;var bn=class extends li{constructor(e,t,n){super(e,t,n)}};bn.prototype.ValueTypeName="string";bn.prototype.ValueBufferType=Array;bn.prototype.DefaultInterpolation=Ts;bn.prototype.InterpolantFactoryMethodLinear=void 0;bn.prototype.InterpolantFactoryMethodSmooth=void 0;var ji=class extends li{};ji.prototype.ValueTypeName="vector";var ka=class{constructor(e="",t=-1,n=[],s=dm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=_i(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Xx(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(li.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=Gx(l);l=yd(l,1,h),c=yd(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new qi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,m,y){if(f.length!==0){let g=[],p=[];qd(f,g,p,m),g.length!==0&&y.push(new u(d,g,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let y=0;y<d[m].morphTargets.length;y++)f[d[m].morphTargets[y]]=-1;for(let y in f){let g=[],p=[];for(let T=0;T!==d[m].morphTargets.length;++T){let x=d[m];g.push(x.time),p.push(x.morphTarget===y?1:0)}s.push(new qi(".morphTargetInfluence["+y+"]",g,p))}l=f.length*a}else{let f=".bones["+t[u].name+"]";n(ji,f+".position",d,"pos",s),n(Yi,f+".quaternion",d,"rot",s),n(ji,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Wx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return qi;case"vector":case"vector2":case"vector3":case"vector4":return ji;case"color":return Ba;case"quaternion":return Yi;case"bool":case"boolean":return vn;case"string":return bn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Xx(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Wx(i.type);if(i.times===void 0){let t=[],n=[];qd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var fn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},gr=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}},Yn=new gr,bi=class{constructor(e){this.manager=e!==void 0?e:Yn,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var ki={},fc=class extends Error{constructor(e,t){super(e),this.response=t}},Ci=class extends bi{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=fn.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ki[e]!==void 0){ki[e].push({onLoad:t,onProgress:n,onError:s});return}ki[e]=[],ki[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=ki[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,y=0,g=new ReadableStream({start(p){T();function T(){u.read().then(({done:x,value:v})=>{if(x)p.close();else{y+=v.byteLength;let P=new ProgressEvent("progress",{lengthComputable:m,loaded:y,total:f});for(let E=0,A=h.length;E<A;E++){let R=h[E];R.onProgress&&R.onProgress(P)}p.enqueue(v),T()}},x=>{p.error(x)})}}});return new Response(g)}else throw new fc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{fn.add(e,c);let h=ki[e];delete ki[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=ki[e];if(h===void 0)throw this.manager.itemError(e),c;delete ki[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var pc=class extends bi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=fn.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=lr("img");function l(){h(),fn.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var za=class extends bi{constructor(e){super(e)}load(e,t,n,s){let r=new yt,a=new pc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ls=class extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Va=class extends Ls{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},al=new ce,_d=new C,xd=new C,yr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gn,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;_d.setFromMatrixPosition(e.matrixWorld),t.position.copy(_d),xd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xd),t.updateMatrixWorld(),al.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(al),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(al)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},mc=class extends yr{constructor(){super(new gt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Es*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Ha=class extends Ls{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new mc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},vd=new ce,Qs=new C,ol=new C,gc=class extends yr{constructor(){super(new gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new qe(2,1,1,1),new qe(0,1,1,1),new qe(3,1,1,1),new qe(1,1,1,1),new qe(3,0,1,1),new qe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Qs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Qs),ol.copy(n.position),ol.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ol),n.updateMatrixWorld(),s.makeTranslation(-Qs.x,-Qs.y,-Qs.z),vd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vd)}},Ga=class extends Ls{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new gc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},yc=class extends yr{constructor(){super(new Xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ds=class extends Ls{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new yc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Mn=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Wa=class extends bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=fn.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return fn.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),fn.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});fn.add(e,l),r.manager.itemStart(e)}};var Lc="\\[\\]\\.:\\/",qx=new RegExp("["+Lc+"]","g"),Dc="[^"+Lc+"]",Yx="[^"+Lc.replace("\\.","")+"]",jx=/((?:WC+[\/:])*)/.source.replace("WC",Dc),Zx=/(WCOD+)?/.source.replace("WCOD",Yx),$x=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Dc),Jx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Dc),Kx=new RegExp("^"+jx+Zx+$x+Jx+"$"),Qx=["material","materials","bones","map"],_c=class{constructor(e,t,n){let s=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},st=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qx,"")}static parseTrackName(e){let t=Kx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Qx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};st.Composite=_c;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var qb=new Float32Array(1);var bd=new ce,Us=class{constructor(e,t,n=0,s=1/0){this.ray=new ai(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new hr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return bd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bd),this}intersectObject(e,t=!0,n=[]){return xc(e,this,n,t),n.sort(Md),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)xc(e[s],this,n,t);return n.sort(Md),n}};function Md(i,e){return i.distance-e.distance}function xc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)xc(r[a],e,t,!0)}}var Xa=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var qa=class i{constructor(e,t,n,s){i.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}},Sd=new ve,Ya=class{constructor(e=new ve(1/0,1/0),t=new ve(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Sd.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sd).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function tv(i){try{let e=typeof location<"u"?location.href:void 0;return new URL(i,e).origin}catch{return null}}function Yd(i){if(!i)return null;let e=i.length,t=i.indexOf("?"),n=i.indexOf("#");t!==-1&&(e=Math.min(e,t)),n!==-1&&(e=Math.min(e,n));let s=i.lastIndexOf(".",e),r=i.lastIndexOf("/",e),a=i.indexOf("://");return a!==-1&&a+2===r||s===-1||s<r?null:i.substring(s+1,e)||null}var io=class{static pending=new Map;static session=null;static setXRSession(i){i!==this.session&&(this.flushPending(),this.session=i)}static requestAnimationFrame(i){let{session:e,pending:t}=this,n,s=()=>{t.delete(n),i()};return n=e?e.requestAnimationFrame(s):requestAnimationFrame(s),t.set(n,i),n}static cancelAnimationFrame(i){let{pending:e,session:t}=this;e.delete(i),t?t.cancelAnimationFrame(i):cancelAnimationFrame(i)}static flushPending(){this.pending.forEach((i,e)=>{i(),this.cancelAnimationFrame(e)})}},jd=2**30,Jd=class{get unloadPriorityCallback(){return this._unloadPriorityCallback}set unloadPriorityCallback(i){i.length===1?(console.warn('LRUCache: "unloadPriorityCallback" function has been changed to take two arguments.'),this._unloadPriorityCallback=(e,t)=>{let n=i(e),s=i(t);return n<s?-1:+(n>s)}):this._unloadPriorityCallback=i}constructor(){this.minSize=6e3,this.maxSize=8e3,this.minBytesSize=.3*jd,this.maxBytesSize=.4*jd,this.unloadPercent=.05,this.autoMarkUnused=!0,this.cachedBytes=0,this.itemSet=new Map,this.itemList=[],this.usedSet=new Set,this.callbacks=new Map,this.unloadingHandle=-1,this.bytesMap=new Map,this.loadedSet=new Set,this._unloadPriorityCallback=null;let i=this.itemSet;this.defaultPriorityCallback=e=>i.get(e)}isFull(){return this.itemSet.size>=this.maxSize||this.cachedBytes>=this.maxBytesSize}getMemoryUsage(i){return this.bytesMap.get(i)||0}setMemoryUsage(i,e){let{bytesMap:t,itemSet:n}=this;n.has(i)&&(e=Math.round(e),this.cachedBytes-=t.get(i)||0,t.set(i,e),this.cachedBytes+=e)}add(i,e){let t=this.itemSet;if(t.has(i)||this.isFull())return!1;let n=this.usedSet,s=this.itemList,r=this.callbacks;return s.push(i),n.add(i),t.set(i,Date.now()),r.set(i,e),!0}has(i){return this.itemSet.has(i)}remove(i){let e=this.usedSet,t=this.itemSet,n=this.itemList,s=this.bytesMap,r=this.callbacks,a=this.loadedSet;if(t.has(i)){this.cachedBytes-=s.get(i)||0,s.delete(i),r.get(i)(i);let o=n.indexOf(i);return n.splice(o,1),e.delete(i),t.delete(i),r.delete(i),a.delete(i),!0}return!1}setLoaded(i,e){let{itemSet:t,loadedSet:n}=this;t.has(i)&&(e===!0?n.add(i):n.delete(i))}markUsed(i){let e=this.itemSet,t=this.usedSet;e.has(i)&&!t.has(i)&&(e.set(i,Date.now()),t.add(i))}markUnused(i){this.usedSet.delete(i)}markAllUnused(){this.usedSet.clear()}isUsed(i){return this.usedSet.has(i)}unloadUnusedContent(){let{unloadPercent:i,minSize:e,maxSize:t,itemList:n,itemSet:s,usedSet:r,loadedSet:a,callbacks:o,bytesMap:l,minBytesSize:c,maxBytesSize:h}=this,u=n.length-r.size,d=n.length-a.size,f=Math.max(Math.min(n.length-e,u),0),m=this.cachedBytes-c,y=this.unloadPriorityCallback||this.defaultPriorityCallback,g=!1,p=f>0&&u>0||d&&n.length>t;if(u&&this.cachedBytes>c||d&&this.cachedBytes>h||p){n.sort((R,S)=>{let M=r.has(R);if(M===r.has(S)){let I=a.has(R);return I===a.has(S)?-y(R,S):I?1:-1}return M?1:-1});let T=Math.max(e*i,f*i),x=Math.ceil(Math.min(T,u,f)),v=Math.max(i*m,i*c),P=Math.min(v,m),E=0,A=0;for(;E<n.length&&(this.cachedBytes-A>h||n.length-E>t);){let R=n[E],S=l.get(R)||0;if(r.has(R)&&a.has(R)||this.cachedBytes-A-S<h&&n.length-E<=t)break;A+=S,E++}for(;E<n.length&&(A<P||E<x);){let R=n[E],S=l.get(R)||0;if(r.has(R)||this.cachedBytes-A-S<c&&E>=x)break;A+=S,E++}n.splice(0,E).forEach(R=>{this.cachedBytes-=l.get(R)||0,o.get(R)(R),l.delete(R),s.delete(R),o.delete(R),a.delete(R),r.delete(R)}),g=E<f||A<m&&E<u,g&&=E>0}g&&(this.unloadingHandle=io.requestAnimationFrame(()=>this.scheduleUnload()))}scheduleUnload(){io.cancelAnimationFrame(this.unloadingHandle),this.scheduled||(this.scheduled=!0,queueMicrotask(()=>{this.scheduled=!1,this.unloadUnusedContent()}))}},iv=class extends DOMException{constructor(){super("PriorityQueue: Item removed","AbortError")}},Fs=class{get running(){return this.items.length!==0||this.currJobs!==0}constructor(){this.maxJobs=6,this.items=[],this.callbacks=new Map,this.currJobs=0,this.scheduled=!1,this.autoUpdate=!0,this.priorityCallback=null,this._schedulingCallback=i=>{io.requestAnimationFrame(i)},this._runjobs=()=>{this.scheduled=!1,this.tryRunJobs()}}sort(){let i=this.priorityCallback,e=this.items;i!==null&&e.sort(i)}has(i){return this.callbacks.has(i)}add(i,e){let t={callback:e,reject:null,resolve:null,promise:null};return t.promise=new Promise((n,s)=>{let r=this.items,a=this.callbacks;t.resolve=n,t.reject=s,r.unshift(i),a.set(i,t),this.autoUpdate&&this.scheduleJobRun()}),t.promise}remove(i){let e=this.items,t=this.callbacks,n=e.indexOf(i);if(n!==-1){let s=t.get(i);s.promise.catch(r=>{if(r.name!=="AbortError")throw r}),s.reject(new iv),e.splice(n,1),t.delete(i)}}removeByFilter(i){let{items:e}=this;for(let t=0;t<e.length;t++){let n=e[t];i(n)&&(this.remove(n),t--)}}tryRunJobs(){this.sort();let i=this.items,e=this.callbacks,t=this.maxJobs,n=0,s=()=>{this.currJobs--,this.autoUpdate&&this.scheduleJobRun()};for(;t>this.currJobs&&i.length>0&&n<t;){this.currJobs++,n++;let r=i.pop(),{callback:a,resolve:o,reject:l}=e.get(r);e.delete(r);let c;try{c=a(r)}catch(h){l(h),s();continue}c instanceof Promise?c.then(o).catch(l).finally(s):(o(c),s())}}flush(i){let{items:e,callbacks:t}=this,n=e.indexOf(i);if(!t.has(i))return;let{callback:s,resolve:r,reject:a}=t.get(i);t.delete(i),e.splice(n,1);let o;try{o=s(i)}catch(l){a(l);return}return o instanceof Promise?o.then(r).catch(a):r(o),o}scheduleJobRun(){this.scheduled||=(this._schedulingCallback(this._runjobs),!0)}},nv=class{get running(){for(let i of this.originQueues.values())if(i.running)return!0;return!1}get maxJobsPerOrigin(){return this._maxJobsPerOrigin}set maxJobsPerOrigin(i){this._maxJobsPerOrigin=i,this.originQueues.forEach(e=>e.maxJobs=i)}get maxJobs(){return this.maxJobsPerOrigin}set maxJobs(i){console.warn('DownloadPriorityQueue: "maxJobs" is no longer valid and limits jobs per server origin. Use "maxJobsPerOrigin", instead.'),this.maxJobsPerOrigin=i}get priorityCallback(){return this._priorityCallback}set priorityCallback(i){this._priorityCallback=i,this.originQueues.forEach(e=>e.priorityCallback=i)}constructor(){this.originQueues=new Map,this._itemQueues=new WeakMap,this._maxJobsPerOrigin=6,this._priorityCallback=null}add(i,e,t,n=null){this.originQueues.forEach((l,c)=>{l.running||this.originQueues.delete(c)});let s=i===null?null:tv(i),r=this.originQueues.get(s);r||(r=new Fs,r.maxJobs=this._maxJobsPerOrigin,r.priorityCallback=this._priorityCallback,this.originQueues.set(s,r));let a=this._itemQueues.get(e);if(a&&a!==r&&a.has(e))throw Error("DownloadPriorityQueue: Item is already queued with a different url origin.");this._itemQueues.set(e,r);let o=r.add(e,t);return n!==null&&(n.aborted?this.remove(e):n.addEventListener("abort",()=>this.remove(e),{once:!0})),o}remove(i){let e=this._itemQueues.get(i);e&&(e.remove(i),this._itemQueues.delete(i))}has(i){let e=this._itemQueues.get(i);return!!(e&&e.has(i))}};var Bs=6378137,Yb=1/298.257223563,Kd=6356752314245179e-9,to={inView:!1,error:1/0,distanceFromCamera:1/0};function ro(i){return i===4||i===-1}function Zi(i,e){return ao(i)&&i.traversal.lastFrameVisited===e&&i.traversal.used}function ao(i){return!!i.traversal}function br(i){let{children:e}=i,t=e.length===0||ao(e[e.length-1]),n=!i.internal.hasUnrenderableContent||ro(i.internal.loadingState);return t&&n}function jn(i){return i.traversal.unconditionallyRefine}function vr(i,e,t=!0){if(ao(i)&&(e.ensureChildrenArePreprocessed(i),i.traversal.lastFrameVisited!==e.frameCount&&(i.traversal.wasInFrustum=i.traversal.inFrustum,i.traversal.wasSetActive=i.traversal.active,i.traversal.wasSetVisible=i.traversal.visible,i.traversal.usedLastFrame=i.traversal.used,i.traversal.lastFrameVisited=e.frameCount,i.traversal.used=!1,i.traversal.inFrustum=!1,i.traversal.isLeaf=!1,i.traversal.visible=!1,i.traversal.active=!1,i.traversal.error=1/0,i.traversal.distanceFromCamera=1/0,i.traversal.allChildrenReady=!1,i.traversal.allChildrenLoaded=!1,i.traversal.kicked=!1,i.traversal.allUsedChildrenProcessed=!1,t&&(e.calculateTileViewErrorWithPlugin(i,to),i.traversal.inFrustum=to.inView,i.traversal.error=to.error,i.traversal.distanceFromCamera=to.distanceFromCamera),i.traversal.unconditionallyRefine=i.internal.hasUnrenderableContent,!i.traversal.unconditionallyRefine))){let n=i.parent;for(;n&&n.traversal.unconditionallyRefine;)n=n.parent;n&&n.geometricError<=i.geometricError&&(i.traversal.unconditionallyRefine=!0)}}function Uc(i,e,t=!1){if(vr(i,e),t?e.markTileUsed(i):no(i),jn(i)&&br(i)){let n=i.children;for(let s=0,r=n.length;s<r;s++)Uc(n[s],e,t)}}function Qd(i,e){if(vr(i,e),i.traversal.usedLastFrame&&(no(i),i.traversal.wasSetActive&&(i.traversal.active=!0),(!i.traversal.active||jn(i))&&br(i))){let t=i.children;for(let n=0,s=t.length;n<s;n++)Qd(t[n],e)}}function no(i){i.traversal.used=!0}function sv(i,e){return!(i.traversal.error<=e.errorTarget&&!jn(i)||e.maxDepth>0&&i.internal.depth+1>=e.maxDepth||!br(i))}function ef(i,e){let{frameCount:t}=e,{children:n}=i;for(let s=0,r=n.length;s<r;s++){let a=n[s];Zi(a,t)&&(a.traversal.active&&(a.traversal.kicked=!0,a.traversal.active=!1),ef(a,e))}}function Zd(i){return!jn(i)&&(!i.internal.hasContent||ro(i.internal.loadingState))}function tf(i,e){if(vr(i,e),!i.traversal.inFrustum)return;let t=i.parent;if(t&&t.refine==="ADD"&&!t.internal.hasUnrenderableContent&&i.geometricError>0&&i.traversal.error*(t.geometricError/i.geometricError)<=e.errorTarget)return;if(!sv(i,e)){no(i);return}let n=!1,s=!1,r=i.children;for(let a=0,o=r.length;a<o;a++){let l=r[a];tf(l,e),n||=Zi(l,e.frameCount),s||=l.traversal.inFrustum}if(i.refine==="REPLACE"&&!s&&r.length!==0){i.traversal.inFrustum=!1,e.markTileUsed(i);for(let a=0,o=r.length;a<o;a++)Uc(r[a],e,!0)}else if(no(i),i.refine==="REPLACE"&&n&&(e.loadSiblings||e.loadAncestors))for(let a=0,o=r.length;a<o;a++)Uc(r[a],e)}function nf(i,e){let t=e.frameCount;if(!Zi(i,t))return;let n=i.children,s=!1;for(let a=0,o=n.length;a<o;a++){let l=n[a];s||=Zi(l,t)}if(!s)i.traversal.isLeaf=!0;else{for(let o=0,l=n.length;o<l;o++)nf(n[o],e);let a=!0;for(let o=0,l=n.length;o<l;o++){let c=n[o];if(Zi(c,t)){let h=!jn(c),u=!c.internal.hasContent||ro(c.internal.loadingState);h&&u||c.traversal.allChildrenLoaded||(a=!1)}}i.traversal.allChildrenLoaded=a}let r=!0;for(let a=0,o=n.length;a<o;a++){let l=n[a];Zi(l,e.frameCount)&&!l.traversal.allUsedChildrenProcessed&&(r=!1)}i.traversal.allUsedChildrenProcessed=r&&br(i)}function sf(i,e){if(!Zi(i,e.frameCount))return;let t=i.children;if(i.refine==="REPLACE"&&e.loadAncestors&&!i.traversal.allChildrenLoaded&&!jn(i)&&(i.traversal.isLeaf=!0),i.traversal.isLeaf){if(!jn(i)&&(i.traversal.active=!0,br(i)&&i.internal.hasContent&&!ro(i.internal.loadingState)))for(let s=0,r=t.length;s<r;s++)Qd(t[s],e);return}let n=t.length>0;for(let s=0,r=t.length;s<r;s++){let a=t[s];sf(a,e),Zi(a,e.frameCount)&&!(a.traversal.active&&Zd(a))&&!a.traversal.allChildrenReady&&(n=!1)}i.traversal.allChildrenReady=n,i.refine==="REPLACE"&&!n&&i.traversal.wasSetActive&&Zd(i)&&(i.traversal.active=!0,ef(i,e))}function rf(i,e){vr(i,e,!1);let t=Zi(i,e.frameCount);if(t&&(i.internal.hasUnrenderableContent&&(e.markTileUsed(i),e.queueTileForDownload(i)),i.refine==="ADD"&&(i.traversal.active=!0),(i.traversal.active||i.traversal.kicked)&&i.internal.hasContent&&(e.markTileUsed(i),i.traversal.allUsedChildrenProcessed&&e.queueTileForDownload(i),i.internal.loadingState!==4&&(i.traversal.active=!1)),e.loadAncestors&&i.internal.hasContent&&(e.markTileUsed(i),e.queueTileForDownload(i)),i.internal.virtualChildCount>0&&i.internal.hasContent&&e.markTileUsed(i),i.traversal.visible=i.internal.hasRenderableContent&&i.traversal.active&&i.traversal.inFrustum&&i.internal.loadingState===4,e.stats.used++,i.traversal.inFrustum&&e.stats.inFrustum++),t||ao(i)&&i.traversal.usedLastFrame){let n=!1,s=!1;t?(n=i.traversal.active,s=e.displayActiveTiles&&i.traversal.active||i.traversal.visible):vr(i,e,!1),i.internal.hasRenderableContent&&i.internal.loadingState===4?(n&&e.stats.active++,s&&e.stats.visible++,i.traversal.wasSetActive!==n&&e.invokeOnePlugin(a=>a.setTileActive&&a.setTileActive(i,n)),i.traversal.wasSetVisible!==s&&e.invokeOnePlugin(a=>a.setTileVisible&&a.setTileVisible(i,s))):i.internal.hasRenderableContent||(s=i.traversal.active&&i.traversal.inFrustum,i.traversal.wasSetVisible!==s&&e.invokeOnePlugin(a=>a.setEmptyTileVisible&&a.setEmptyTileVisible(i,s))),i.traversal.visible=s,i.traversal.active=n;let r=i.children;for(let a=0,o=r.length;a<o;a++){let l=r[a];rf(l,e)}}}function rv(i,e){tf(i,e),nf(i,e),sf(i,e),rf(i,e)}function av(i){let e=null;return()=>{e===null&&(e=io.requestAnimationFrame(()=>{e=null,i()}))}}function Fc(i,e=null,t=null){let n=[];for(n.push(i),n.push(null),n.push(0);n.length>0;){let s=n.pop(),r=n.pop(),a=n.pop();if(e&&e(a,r,s)){t&&t(a,r,s);return}let o=a.children;if(o)for(let l=o.length-1;l>=0;l--)n.push(o[l]),n.push(a),n.push(s+1);t&&t(a,r,s)}}var $d=Symbol("PLUGIN_REGISTERED"),Sn={inView:!0,error:0,distance:1/0},ov=(i,e)=>{let t=i.priority||0,n=e.priority||0;return t===n?!i.traversal||!e.traversal?0:i.traversal.used===e.traversal.used?i.traversal.error===e.traversal.error?i.traversal.distanceFromCamera===e.traversal.distanceFromCamera?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?0:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?-1:1:i.traversal.distanceFromCamera>e.traversal.distanceFromCamera?-1:1:i.traversal.error>e.traversal.error?1:-1:i.traversal.used?1:-1:t>n?1:-1},lv=(i,e)=>i.traversal.used===e.traversal.used?i.traversal.inFrustum===e.traversal.inFrustum?i.internal.hasUnrenderableContent===e.internal.hasUnrenderableContent?i.traversal.distanceFromCamera===e.traversal.distanceFromCamera?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?0:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?-1:1:i.traversal.distanceFromCamera>e.traversal.distanceFromCamera?-1:1:i.internal.hasUnrenderableContent?1:-1:i.traversal.inFrustum?1:-1:i.traversal.used?1:-1,cv=(i,e)=>i.traversal.lastFrameVisited===e.traversal.lastFrameVisited?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?i.internal.loadingState===e.internal.loadingState?i.internal.hasUnrenderableContent===e.internal.hasUnrenderableContent?i.traversal.error===e.traversal.error?0:i.traversal.error>e.traversal.error?-1:1:i.internal.hasUnrenderableContent?-1:1:i.internal.loadingState>e.internal.loadingState?-1:1:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?1:-1:i.traversal.lastFrameVisited>e.traversal.lastFrameVisited?-1:1,Mr=(i,e)=>{let t=i.priority??1/0,n=e.priority??1/0;if(t!==n)return t>n?1:-1;if(!i.internal||!e.internal)return 0;let s=i.internal.renderer,r=e.internal.renderer,a=!s.loadAncestors,o=!r.loadAncestors;return a&&o?lv(i,e):ov(i,e)},af=new Jd;af.unloadPriorityCallback=cv;var so=new nv;so.maxJobsPerOrigin=25,so.priorityCallback=Mr;var Nc=new Fs;Nc.maxJobs=5,Nc.priorityCallback=Mr;var Oc=new Fs;Oc.maxJobs=25,Oc.priorityCallback=(i,e)=>{let t=i.parent,n=e.parent;return t===n?0:t?n?Mr(t,n):-1:1};var of=class{get root(){let i=this.rootTileset;return i?i.root:null}get loadProgress(){let{stats:i,isLoading:e}=this,t=i.queued+i.downloading+i.parsing,n=i.inCacheSinceLoad+ +!!e;return n===0?1:1-t/n}get downloadQueue(){return this._downloadQueue}set downloadQueue(i){i instanceof Fs?console.warn('TilesRenderer: "downloadQueue" is no longer valid as a PriorityQueue. Use a DownloadPriorityQueue, instead.'):this._downloadQueue=i}constructor(i=null){this.rootLoadingState=0,this.rootTileset=null,this.rootURL=i,this.fetchOptions={},this.plugins=[],this.queuedTiles=[],this.queuedTileSet=new Set,this.cachedSinceLoadComplete=new Set,this.isLoading=!1,this.processedTiles=new WeakSet,this.visibleTiles=new Set,this.activeTiles=new Set,this.usedSet=new Set,this.loadingTiles=new Set,this.lruCache=af,this.downloadQueue=so,this.parseQueue=Nc,this.processNodeQueue=Oc,this.stats={inCacheSinceLoad:0,inCache:0,queued:0,downloading:0,parsing:0,loaded:0,failed:0,inFrustum:0,used:0,active:0,visible:0,refused:0,tilesProcessed:0},this.frameCount=0,this._dispatchNeedsUpdateEvent=av(()=>{this.dispatchEvent({type:"needs-update"})}),this.errorTarget=16,this.errorFalloff=0,this.errorFalloffDensity=2e-4,this.displayActiveTiles=!1,this.maxDepth=1/0,this.loadSiblings=!0,this.loadAncestors=!0,this.maxTilesProcessed=250}registerPlugin(i){if(i[$d]===!0)throw Error("TilesRendererBase: A plugin can only be registered to a single tileset");let e=this.plugins,t=i.priority||0,n=e.length;for(let s=0;s<e.length;s++)if((e[s].priority||0)>t){n=s;break}e.splice(n,0,i),i[$d]=!0,i.init&&i.init(this)}unregisterPlugin(i){let e=this.plugins;if(typeof i=="string"&&(i=this.getPluginByName(i)),e.includes(i)){let t=e.indexOf(i);return e.splice(t,1),i.dispose&&i.dispose(),!0}return!1}getPluginByName(i){return this.plugins.find(e=>e.name===i)||null}invokeOnePlugin(i){let e=[...this.plugins,this];for(let t=0;t<e.length;t++){let n=i(e[t]);if(n)return n}return null}invokeAllPlugins(i){let e=[...this.plugins,this],t=[];for(let n=0;n<e.length;n++){let s=i(e[n]);s&&t.push(s)}return t.length===0?null:Promise.all(t)}traverse(i,e,t=!0){this.root&&Fc(this.root,(n,...s)=>(t&&this.ensureChildrenArePreprocessed(n,!0),i?i(n,...s):!1),e)}getAttributions(i=[]){return this.invokeAllPlugins(e=>e!==this&&e.getAttributions&&e.getAttributions(i)),i}update(){let{lruCache:i,usedSet:e,stats:t,root:n,downloadQueue:s,parseQueue:r,processNodeQueue:a,queuedTiles:o,queuedTileSet:l}=this;if(this.rootLoadingState===0&&(this.rootLoadingState=2,this.invokeOnePlugin(d=>d.loadRootTileset&&d.loadRootTileset()).then(d=>{let f=this.rootURL;f!==null&&this.invokeAllPlugins(m=>f=m.preprocessURL?m.preprocessURL(f,null):f),this.rootLoadingState=4,this.rootTileset=d,this.dispatchEvent({type:"needs-update"}),this.dispatchEvent({type:"load-tileset",tileset:d,url:f}),this.dispatchEvent({type:"load-root-tileset",tileset:d,url:f})}).catch(d=>{this.rootLoadingState=-1,console.error(d),this.rootTileset=null,this.dispatchEvent({type:"load-error",tile:null,error:d,url:this.rootURL})})),!n)return;let c=null;if(this.invokeAllPlugins(d=>{if(d.doTilesNeedUpdate){let f=d.doTilesNeedUpdate();c=c===null?f:!!(c||f)}}),c===!1){this.dispatchEvent({type:"update-before"}),this.dispatchEvent({type:"update-after"});return}this.dispatchEvent({type:"update-before"}),t.inFrustum=0,t.used=0,t.active=0,t.visible=0,t.refused=0,t.tilesProcessed=0,this.frameCount++,e.forEach(d=>i.markUnused(d)),e.clear(),this.prepareForTraversal(),rv(n,this),this.removeUnusedPendingTiles(),o.sort(i.unloadPriorityCallback);let h=0,u=o.length;for(;h<u&&!i.isFull();h++)this.requestTileContents(o[h]);t.refused+=o.length-h,o.length=0,l.clear(),i.scheduleUnload(),(s.running||r.running||a.running)===!1&&this.isLoading===!0&&(this.cachedSinceLoadComplete.clear(),t.inCacheSinceLoad=0,this.dispatchEvent({type:"tiles-load-end"}),this.isLoading=!1),this.dispatchEvent({type:"update-after"})}resetFailedTiles(){this.rootLoadingState===-1&&(this.rootLoadingState=0);let i=this.stats;i.failed!==0&&(this.traverse(e=>{e.internal.loadingState===-1&&(e.internal.loadingState=0)},null,!1),i.failed=0)}calculateTileViewErrorWithPlugin(i,e){this.calculateTileViewError(i,e);let{errorFalloff:t,errorFalloffDensity:n}=this;if(t>0&&Number.isFinite(e.distanceFromCamera)){let o=e.distanceFromCamera*n;e.error-=t*(1-Math.exp(-o*o))}let s=null,r=0,a=1/0;this.invokeAllPlugins(o=>{o!==this&&o.calculateTileViewError&&(Sn.inView=!0,Sn.error=0,Sn.distance=1/0,o.calculateTileViewError(i,Sn)&&(s===null&&(s=!0),s&&=Sn.inView,Sn.inView&&(a=Math.min(a,Sn.distance),r=Math.max(r,Sn.error))))}),e.inView&&s!==!1?(e.error=Math.max(e.error,r),e.distanceFromCamera=Math.min(e.distanceFromCamera,a)):s?(e.inView=!0,e.error=r,e.distanceFromCamera=a):e.inView=!1}dispose(){[...this.plugins].forEach(t=>{this.unregisterPlugin(t)});let i=this.lruCache,e=[];this.traverse(t=>(e.push(t),!1),null,!1);for(let t=0,n=e.length;t<n;t++)i.remove(e[t]);this.stats={queued:0,parsing:0,downloading:0,failed:0,inFrustum:0,traversed:0,used:0,active:0,visible:0},this.frameCount=0,this.loadingTiles.clear()}calculateBytesUsed(i,e){return 0}dispatchEvent(i){}addEventListener(i,e){}removeEventListener(i,e){}parseTile(i,e,t){return null}prepareForTraversal(){}disposeTile(i){i.traversal.visible&&(i.internal.hasRenderableContent?this.invokeOnePlugin(t=>t.setTileVisible&&t.setTileVisible(i,!1)):this.invokeOnePlugin(t=>t.setEmptyTileVisible&&t.setEmptyTileVisible(i,!1)),i.traversal.visible=!1),i.traversal.active&&i.internal.hasRenderableContent&&this.invokeOnePlugin(t=>t.setTileActive&&t.setTileActive(i,!1)),i.traversal.active=!1;let{scene:e}=i.engineData;e&&this.dispatchEvent({type:"dispose-model",scene:e,tile:i})}preprocessNode(i,e,t=null){if(this.processedTiles.add(i),this.stats.tilesProcessed++,i.content&&(!("uri"in i.content)&&"url"in i.content&&(i.content.uri=i.content.url,delete i.content.url),i.content.boundingVolume&&!("box"in i.content.boundingVolume||"sphere"in i.content.boundingVolume||"region"in i.content.boundingVolume)&&delete i.content.boundingVolume),i.parent=t,i.children=i.children||[],i.internal={hasContent:!1,hasRenderableContent:!1,hasUnrenderableContent:!1,loadingState:0,basePath:e,depth:-1,depthFromRenderedParent:-1,isVirtual:!1,virtualChildCount:0,renderer:this,...i.internal},i.content?.uri){let n=Yd(i.content.uri),s=!!(n&&/json$/.test(n));i.internal.hasContent=!0,i.internal.hasUnrenderableContent=s,i.internal.hasRenderableContent=!s}else i.internal.hasContent=!1,i.internal.hasUnrenderableContent=!1,i.internal.hasRenderableContent=!1;t?(i.internal.depth=t.internal.depth+1,i.internal.depthFromRenderedParent=t.internal.depthFromRenderedParent+ +!!i.internal.hasRenderableContent):(i.internal.depth=0,i.internal.depthFromRenderedParent=+!!i.internal.hasRenderableContent),i.traversal={distanceFromCamera:1/0,error:1/0,inFrustum:!1,wasInFrustum:!1,isLeaf:!1,used:!1,usedLastFrame:!1,visible:!1,wasSetVisible:!1,active:!1,wasSetActive:!1,allChildrenReady:!1,allChildrenLoaded:!1,kicked:!1,allUsedChildrenProcessed:!1,lastFrameVisited:-1},i.refine=t===null?i.refine||"REPLACE":i.refine||t.refine,i.engineData={scene:null,metadata:null,boundingVolume:null},Object.defineProperty(i,"cached",{get(){return console.warn('TilesRenderer: "tile.cached" field has been renamed to "tile.engineData".'),this.engineData},enumerable:!1,configurable:!0}),this.invokeAllPlugins(n=>{n!==this&&n.preprocessNode&&n.preprocessNode(i,e,t)})}setTileActive(i,e){e?this.activeTiles.add(i):this.activeTiles.delete(i)}setTileVisible(i,e){e?this.visibleTiles.add(i):this.visibleTiles.delete(i),this.dispatchEvent({type:"tile-visibility-change",scene:i.engineData.scene,tile:i,visible:e})}calculateTileViewError(i,e){}removeUnusedPendingTiles(){let{lruCache:i,loadingTiles:e}=this,t=[];for(let n of e)!i.isUsed(n)&&n.internal.loadingState===1&&t.push(n);for(let n=0;n<t.length;n++)i.remove(t[n])}queueTileForDownload(i){let{queuedTileSet:e}=this;i.internal.loadingState!==0||e.has(i)||(e.add(i),this.lruCache.isFull()?this.stats.refused++:this.queuedTiles.push(i))}markTileUsed(i){this.usedSet.add(i),this.lruCache.markUsed(i)}fetchData(i,e){return fetch(i,e)}ensureChildrenArePreprocessed(i,e=this.stats.tilesProcessed<this.maxTilesProcessed){let t=i.children;if(t.length===0||t[t.length-1].traversal)return;let n=s=>{for(let r=0,a=s.length;r<a;r++){let o=s[r];o&&!o.traversal&&this.preprocessNode(o,i.internal.basePath,i)}};e?(this.processNodeQueue.remove(i),n(t)):this.processNodeQueue.has(i)||this.processNodeQueue.add(i,s=>{n(s.children),this._dispatchNeedsUpdateEvent()})}getBytesUsed(i){let e=0;return this.invokeAllPlugins(t=>{t.calculateBytesUsed&&(e+=t.calculateBytesUsed(i,i.engineData.scene)||0)}),e}recalculateBytesUsed(i=null){let{lruCache:e,processedTiles:t}=this;i===null?e.itemSet.forEach(n=>{t.has(n)&&e.setMemoryUsage(n,this.getBytesUsed(n))}):e.setMemoryUsage(i,this.getBytesUsed(i))}preprocessTileset(i,e,t=null){let[n,s]=i.asset.version.split(".").map(a=>parseInt(a));console.assert(n<=1,"TilesRenderer: asset.version is expected to be a 1.x or a compatible version."),n===1&&s>0&&console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");let r=e.replace(/\/[^/]*$/,"");r=new URL(r,window.location.href).toString(),this.preprocessNode(i.root,r,t)}loadRootTileset(){let i=this.rootURL;return this.invokeAllPlugins(e=>i=e.preprocessURL?e.preprocessURL(i,null):i),this.invokeOnePlugin(e=>e.fetchData&&e.fetchData(i,this.fetchOptions)).then(e=>{if(!(e instanceof Response))return e;if(e.ok)return e.json();throw Error(`TilesRenderer: Failed to load tileset "${i}" with status ${e.status} : ${e.statusText}`)}).then(e=>(this.preprocessTileset(e,i),e))}requestTileContents(i){if(i.internal.loadingState!==0)return;let e=!1,t=null,n=new URL(i.content.uri,i.internal.basePath+"/").toString();this.invokeAllPlugins(d=>n=d.preprocessURL?d.preprocessURL(n,i):n);let s=this.stats,r=this.lruCache,a=this.downloadQueue,o=this.parseQueue,l=this.loadingTiles,c=Yd(n),h=new AbortController,u=h.signal;if(r.add(i,d=>{h.abort(),e?d.children.length=0:this.invokeAllPlugins(f=>{f.disposeTile&&f.disposeTile(d)}),s.inCache--,this.cachedSinceLoadComplete.has(i)&&(this.cachedSinceLoadComplete.delete(i),s.inCacheSinceLoad--),d.internal.loadingState===1?s.queued--:d.internal.loadingState===2?s.downloading--:d.internal.loadingState===3?s.parsing--:d.internal.loadingState===4&&s.loaded--,d.internal.loadingState=0,o.remove(d),a.remove(d),l.delete(d)}))return this.isLoading||(this.isLoading=!0,this.dispatchEvent({type:"tiles-load-start"})),r.setMemoryUsage(i,this.getBytesUsed(i)),this.cachedSinceLoadComplete.add(i),s.inCacheSinceLoad++,s.inCache++,s.queued++,i.internal.loadingState=1,l.add(i),a.add(n,i,d=>{if(u.aborted)return Promise.resolve();i.internal.loadingState=2,s.downloading++,s.queued--;let f=this.invokeOnePlugin(m=>m.fetchData&&m.fetchData(n,{...this.fetchOptions,signal:u}));return this.dispatchEvent({type:"tile-download-start",tile:i,url:n,get uri(){return console.warn('tile-download-start event: "uri" has been renamed to "url".'),this.url}}),f}).then(d=>{if(!u.aborted){if(!(d instanceof Response))return d;if(d.ok)return c==="json"?d.json():d.arrayBuffer();throw Error(`Failed to load model with error code ${d.status}`)}}).then(d=>{if(!u.aborted)return s.downloading--,s.parsing++,i.internal.loadingState=3,o.add(i,f=>u.aborted?Promise.resolve():c==="json"&&d.root?(this.preprocessTileset(d,n,i),i.children.push(d.root),t=d,e=!0,Promise.resolve()):this.invokeOnePlugin(m=>m.parseTile&&m.parseTile(d,f,c,n,u)))}).then(()=>{if(u.aborted)return;s.parsing--,s.loaded++,i.internal.loadingState=4,l.delete(i),r.setLoaded(i,!0);let d=this.getBytesUsed(i);r.getMemoryUsage(i)===0&&d>0&&r.isFull()?r.remove(i):(r.setMemoryUsage(i,d),this.dispatchEvent({type:"needs-update"}),e&&this.dispatchEvent({type:"load-tileset",tileset:t,url:n}),i.engineData.scene&&this.dispatchEvent({type:"load-model",scene:i.engineData.scene,tile:i,url:n}))}).catch(d=>{u.aborted||(d.name==="AbortError"?r.remove(i):(o.remove(i),a.remove(i),i.internal.loadingState===1?s.queued--:i.internal.loadingState===2?s.downloading--:i.internal.loadingState===3?s.parsing--:i.internal.loadingState===4&&s.loaded--,s.failed++,console.error(`TilesRenderer : Failed to load tile at url "${i.content.uri}".`),console.error(d),i.internal.loadingState=-1,l.delete(i),r.setLoaded(i,!0),this.dispatchEvent({type:"load-error",tile:i,error:d,url:n})))})}};function Tn(i){if(i===null||i.byteLength<4)return"";let e;if(e=i instanceof DataView?i:new DataView(i),String.fromCharCode(e.getUint8(0))==="{")return null;let t="";for(let n=0;n<4;n++)t+=String.fromCharCode(e.getUint8(n));return t}var hv=new TextDecoder;function Bc(i){return hv.decode(i)}function oo(i){return i.replace(/[\\/][^\\/]+$/,"")+"/"}var ks=class{constructor(){this.fetchOptions={},this.workingPath=""}loadAsync(i){return fetch(i,this.fetchOptions).then(e=>{if(!e.ok)throw Error(`Failed to load file "${i}" with status ${e.status} : ${e.statusText}`);return e.arrayBuffer()}).then(e=>(this.workingPath===""&&(this.workingPath=oo(i)),this.parse(e)))}resolveExternalURL(i){return new URL(i,this.workingPath).href}parse(i){throw Error("LoaderBase: Parse not implemented.")}};function lf(i,e,t,n,s,r){let a;switch(n){case"SCALAR":a=1;break;case"VEC2":a=2;break;case"VEC3":a=3;break;case"VEC4":a=4;break;default:throw Error(`FeatureTable : Feature type not provided for "${r}".`)}let o,l=t*a;switch(s){case"BYTE":o=new Int8Array(i,e,l);break;case"UNSIGNED_BYTE":o=new Uint8Array(i,e,l);break;case"SHORT":o=new Int16Array(i,e,l);break;case"UNSIGNED_SHORT":o=new Uint16Array(i,e,l);break;case"INT":o=new Int32Array(i,e,l);break;case"UNSIGNED_INT":o=new Uint32Array(i,e,l);break;case"FLOAT":o=new Float32Array(i,e,l);break;case"DOUBLE":o=new Float64Array(i,e,l);break;default:throw Error(`FeatureTable : Feature component type not provided for "${r}".`)}return o}var lo=class{constructor(i,e,t,n){this.buffer=i,this.binOffset=e+t,this.binLength=n;let s=null;if(t!==0){let r=new Uint8Array(i,e,t);s=JSON.parse(Bc(r))}else s={};this.header=s}getKeys(){return Object.keys(this.header).filter(i=>i!=="extensions")}getData(i,e,t=null,n=null){let s=this.header;if(!(i in s))return null;let r=s[i];if(!(r instanceof Object)||Array.isArray(r))return r;{let{buffer:a,binOffset:o,binLength:l}=this,c=r.byteOffset||0,h=r.type||n,u=r.componentType||t;if("type"in r&&n&&r.type!==n)throw Error("FeatureTable: Specified type does not match expected type.");let d=o+c,f=lf(a,d,e,h,u,i);if(d+f.byteLength>o+l)throw Error("FeatureTable: Feature data read outside binary body length.");return f}}getBuffer(i,e){let{buffer:t,binOffset:n}=this;return t.slice(n+i,n+i+e)}},uv=class{constructor(i){this.batchTable=i;let e=i.header.extensions["3DTILES_batch_table_hierarchy"];this.classes=e.classes;for(let n of this.classes){let s=n.instances;for(let r in s)n.instances[r]=this._parseProperty(s[r],n.length,r)}if(this.instancesLength=e.instancesLength,this.classIds=this._parseProperty(e.classIds,this.instancesLength,"classIds"),this.parentCounts=e.parentCounts?this._parseProperty(e.parentCounts,this.instancesLength,"parentCounts"):Array(this.instancesLength).fill(1),e.parentIds){let n=this.parentCounts.reduce((s,r)=>s+r,0);this.parentIds=this._parseProperty(e.parentIds,n,"parentIds")}else this.parentIds=null;this.instancesIds=[];let t={};for(let n of this.classIds)t[n]=t[n]??0,this.instancesIds.push(t[n]),t[n]++}_parseProperty(i,e,t){if(Array.isArray(i))return i;{let{buffer:n,binOffset:s}=this.batchTable,r=i.byteOffset,a=i.componentType||"UNSIGNED_SHORT";return lf(n,s+r,e,"SCALAR",a,t)}}getDataFromId(i,e={}){let t=this.parentCounts[i];if(this.parentIds&&t>0){let o=0;for(let l=0;l<i;l++)o+=this.parentCounts[l];for(let l=0;l<t;l++){let c=this.parentIds[o+l];c!==i&&this.getDataFromId(c,e)}}let n=this.classIds[i],s=this.classes[n].instances,r=this.classes[n].name,a=this.instancesIds[i];for(let o in s)e[r]=e[r]||{},e[r][o]=s[o][a];return e}},kc=class extends lo{constructor(i,e,t,n,s){super(i,t,n,s),this.count=e,this.extensions={};let r=this.header.extensions;r&&r["3DTILES_batch_table_hierarchy"]&&(this.extensions["3DTILES_batch_table_hierarchy"]=new uv(this))}getDataFromId(i,e={}){if(i<0||i>=this.count)throw Error(`BatchTable: id value "${i}" out of bounds for "${this.count}" features number.`);for(let t of this.getKeys()){let n=super.getData(t,this.count),s=ArrayBuffer.isView(n)?n.length/this.count:1;if(s===1)e[t]=n[i];else{let r=i*s;e[t]=Array.from(n.subarray(r,r+s))}}for(let t in this.extensions){let n=this.extensions[t];n.getDataFromId instanceof Function&&(e[t]=e[t]||{},n.getDataFromId(i,e[t]))}return e}getPropertyArray(i){return super.getData(i,this.count)}},cf=class extends ks{parse(i){let e=new DataView(i),t=Tn(e);console.assert(t==="b3dm");let n=e.getUint32(4,!0);console.assert(n===1);let s=e.getUint32(8,!0);console.assert(s===i.byteLength);let r=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=new lo(i.slice(28,28+r+a),0,r,a),h=28+r+a,u=new kc(i.slice(h,h+o+l),c.getData("BATCH_LENGTH"),0,o,l),d=h+o+l;return{version:n,featureTable:c,batchTable:u,glbBytes:new Uint8Array(i,d,s-d)}}},hf=class extends ks{parse(i){let e=new DataView(i),t=Tn(e);console.assert(t==="i3dm");let n=e.getUint32(4,!0);console.assert(n===1);let s=e.getUint32(8,!0);console.assert(s===i.byteLength);let r=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=e.getUint32(28,!0),h=new lo(i.slice(32,32+r+a),0,r,a),u=32+r+a,d=new kc(i.slice(u,u+o+l),h.getData("INSTANCES_LENGTH"),0,o,l),f=u+o+l,m=new Uint8Array(i,f,s-f),y=null,g=null,p=null;if(c)y=m,g=Promise.resolve();else{let T=this.resolveExternalURL(Bc(m));p=oo(T),g=fetch(T,this.fetchOptions).then(x=>{if(!x.ok)throw Error(`I3DMLoaderBase : Failed to load file "${T}" with status ${x.status} : ${x.statusText}`);return x.arrayBuffer()}).then(x=>{y=new Uint8Array(x)})}return g.then(()=>({version:n,featureTable:h,batchTable:d,glbBytes:y,gltfWorkingPath:p}))}},uf=class extends ks{parse(i){let e=new DataView(i),t=Tn(e);console.assert(t==="pnts");let n=e.getUint32(4,!0);console.assert(n===1);let s=e.getUint32(8,!0);console.assert(s===i.byteLength);let r=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=new lo(i.slice(28,28+r+a),0,r,a),h=28+r+a,u=new kc(i.slice(h,h+o+l),c.getData("BATCH_LENGTH")||c.getData("POINTS_LENGTH"),0,o,l);return Promise.resolve({version:n,featureTable:c,batchTable:u})}},df=class extends ks{parse(i){let e=new DataView(i),t=Tn(e);console.assert(t==="cmpt",'CMPTLoader: The magic bytes equal "cmpt".');let n=e.getUint32(4,!0);console.assert(n===1,'CMPTLoader: The version listed in the header is "1".');let s=e.getUint32(8,!0);console.assert(s===i.byteLength,"CMPTLoader: The contents buffer length listed in the header matches the file.");let r=e.getUint32(12,!0),a=[],o=16;for(let l=0;l<r;l++){let c=new DataView(i,o,12),h=Tn(c),u=c.getUint32(4,!0),d=c.getUint32(8,!0),f=new Uint8Array(i,o,d);a.push({type:h,buffer:f,version:u}),o+=d}return{version:n,tiles:a}}};function ff(i){let e=0;for(let n in i.attributes){let s=i.getAttribute(n);e+=s.count*s.itemSize*s.array.BYTES_PER_ELEMENT}let t=i.getIndex();return e+=t?t.count*t.itemSize*t.array.BYTES_PER_ELEMENT:0,e}function zc(i,e){if(e===Nd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===xr||e===Ka){let t=i.getIndex();if(t===null){let a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===xr)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var En=class extends bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Yc(t)}),this.register(function(t){return new jc(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new $c(t)}),this.register(function(t){return new Jc(t)}),this.register(function(t){return new Kc(t)}),this.register(function(t){return new Qc(t)}),this.register(function(t){return new qc(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new Zc(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new Wc(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new oh(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Mn.extractUrlBase(e);a=Mn.resolveURL(c,this.path)}else a=Mn.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Ci(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===_f){try{a[ze.KHR_BINARY_GLTF]=new lh(e)}catch(u){s&&s(u);return}r=JSON.parse(a[ze.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new mh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ze.KHR_MATERIALS_UNLIT:a[u]=new Xc;break;case ze.KHR_DRACO_MESH_COMPRESSION:a[u]=new ch(r,this.dracoLoader);break;case ze.KHR_TEXTURE_TRANSFORM:a[u]=new hh;break;case ze.KHR_MESH_QUANTIZATION:a[u]=new uh;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function dv(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var ze={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Wc=class{constructor(e){this.parser=e,this.name=ze.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new Se(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Tt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ds(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ga(h),c.distance=u;break;case"spot":c=new Ha(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,$i(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Xc=class{constructor(){this.name=ze.KHR_MATERIALS_UNLIT}getMaterialType(){return $t}extendParams(e,t,n){let s=[];e.color=new Se(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Tt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,rt))}return Promise.all(s)}},qc=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Yc=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ve(o,o)}return Promise.all(r)}},jc=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Zc=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},$c=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Se(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Tt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,rt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},Jc=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},Kc=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Se().setRGB(o[0],o[1],o[2],Tt),Promise.all(r)}},Qc=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},eh=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Se().setRGB(o[0],o[1],o[2],Tt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,rt)),Promise.all(r)}},th=class{constructor(e){this.parser=e,this.name=ze.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},ih=class{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},nh=class{constructor(e){this.parser=e,this.name=ze.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},sh=class{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},rh=class{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},ah=class{constructor(e){this.name=ze.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}},oh=class{constructor(e){this.name=ze.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==ci.TRIANGLES&&c.mode!==ci.TRIANGLE_STRIP&&c.mode!==ci.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let m of u){let y=new ce,g=new C,p=new Rt,T=new C(1,1,1),x=new Rs(m.geometry,m.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&T.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,y.compose(g,p,T));for(let v in l)if(v==="_COLOR_0"){let P=l[v];x.instanceColor=new Xn(P.array,P.itemSize,P.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&m.geometry.setAttribute(v,l[v]);ut.prototype.copy.call(x,m),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},_f="glTF",Sr=12,pf={JSON:1313821514,BIN:5130562},lh=class{constructor(e){this.name=ze.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Sr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==_f)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Sr,r=new DataView(e,Sr),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===pf.JSON){let c=new Uint8Array(e,Sr+a,o);this.content=n.decode(c)}else if(l===pf.BIN){let c=Sr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ch=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ze.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=fh[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=fh[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=zs[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(let m in f.attributes){let y=f.attributes[m],g=l[m];g!==void 0&&(y.normalized=g)}u(f)},o,c,Tt,d)})})}},hh=class{constructor(){this.name=ze.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},uh=class{constructor(){this.name=ze.KHR_MESH_QUANTIZATION}},co=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,m=e*c,y=m-c,g=-2*f+3*d,p=f-d,T=1-g,x=p-d+u;for(let v=0;v!==o;v++){let P=a[y+v+o],E=a[y+v+l]*h,A=a[m+v+o],R=a[m+v]*h;r[v]=T*P+x*E+g*A+p*R}return r}},fv=new Rt,dh=class extends co{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return fv.fromArray(r).normalize().toArray(r),r}},ci={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},zs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},mf={9728:Ct,9729:Ot,9984:Sc,9985:ir,9986:fs,9987:Ei},gf={33071:Vi,33648:ar,10497:Hn},Vc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},fh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},wn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},pv={CUBICSPLINE:void 0,LINEAR:ws,STEP:Ts},Hc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function mv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new vi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ai})),i.DefaultMaterial}function Zn(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function $i(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function gv(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function yv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _v(i){let e,t=i.extensions&&i.extensions[ze.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Gc(t.attributes):e=i.indices+":"+Gc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Gc(i.targets[n]);return e}function Gc(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ph(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xv(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var vv=new ce,mh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new dv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new za(this.options.manager):this.textureLoader=new Wa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ci(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Zn(r,o,s),$i(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ze.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Mn.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Vc[s.type],o=zs[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new je(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Vc[s.type],c=zs[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,y,g;if(f&&f!==u){let p=Math.floor(d/f),T="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,x=t.cache.get(T);x||(y=new c(o,p*f,s.count*f/h),x=new ur(y,f/h),t.cache.add(T,x)),g=new dr(x,l,d%f/h,m)}else o===null?y=new c(s.count*l):y=new c(o,d,s.count*l),g=new je(y,l,m);if(s.sparse!==void 0){let p=Vc.SCALAR,T=zs[s.sparse.indices.componentType],x=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,P=new T(a[1],x,s.sparse.count*p),E=new c(a[2],v,s.sparse.count*l);o!==null&&(g=new je(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,R=P.length;A<R;A++){let S=P[A];if(g.setX(S,E[A*l]),l>=2&&g.setY(S,E[A*l+1]),l>=3&&g.setZ(S,E[A*l+2]),l>=4&&g.setW(S,E[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=mf[d.magFilter]||Ot,h.minFilter=mf[d.minFilter]||Ei,h.wrapS=gf[d.wrapS]||Hn,h.wrapT=gf[d.wrapT]||Hn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ct&&h.minFilter!==Ot,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(y){let g=new yt(y);g.needsUpdate=!0,d(g)}),t.load(Mn.resolveURL(u,r.path),m,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),$i(u,a),u.userData.mimeType=a.mimeType||xv(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ze.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[ze.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[ze.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new _n,Zt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ps,Zt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return vi}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[ze.KHR_MATERIALS_UNLIT]){let u=s[ze.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Se(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Tt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,rt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=ii);let h=r.alphaMode||Hc.OPAQUE;if(h===Hc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Hc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==$t&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ve(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==$t&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==$t){let u=r.emissiveFactor;o.emissive=new Se().setRGB(u[0],u[1],u[2],Tt)}return r.emissiveTexture!==void 0&&a!==$t&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,rt)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),$i(u,r),t.associations.set(u,{materials:e}),r.extensions&&Zn(s,u,r),u})}createUniqueName(e){let t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return yf(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=_v(c),u=s[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[ze.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=yf(new _t,c,t),s[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?mv(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,m=h.length;f<m;f++){let y=h[f],g=a[f],p,T=c[f];if(g.mode===ci.TRIANGLES||g.mode===ci.TRIANGLE_STRIP||g.mode===ci.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new Da(y,T):new ct(y,T),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===ci.TRIANGLE_STRIP?p.geometry=zc(p.geometry,Ka):g.mode===ci.TRIANGLE_FAN&&(p.geometry=zc(p.geometry,xr));else if(g.mode===ci.LINES)p=new pr(y,T);else if(g.mode===ci.LINE_STRIP)p=new Is(y,T);else if(g.mode===ci.LINE_LOOP)p=new Fa(y,T);else if(g.mode===ci.POINTS)p=new qn(y,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&yv(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),$i(p,r),g.extensions&&Zn(s,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Zn(s,u[0],r),u[0];let d=new At;r.extensions&&Zn(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new gt(Ns.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Xi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),$i(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new ce;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ua(o,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let f=s.channels[u],m=s.samplers[f.sampler],y=f.target,g=y.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,T=s.parameters!==void 0?s.parameters[m.output]:m.output;y.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",T)),c.push(m),h.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],m=u[2],y=u[3],g=u[4],p=[];for(let T=0,x=d.length;T<x;T++){let v=d[T],P=f[T],E=m[T],A=y[T],R=g[T];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();let S=n._createAnimationTracks(v,P,E,A,R);if(S)for(let M=0;M<S.length;M++)p.push(S[M])}return new ka(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,vv)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new fr:c.length>1?h=new At:c.length===1?h=c[0]:h=new ut,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),$i(h,r),r.extensions&&Zn(n,h,r),r.matrix!==void 0){let u=new ce;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new At;n.name&&(r.name=s.createUniqueName(n.name)),$i(r,n),n.extensions&&Zn(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);let c=h=>{let u=new Map;for(let[d,f]of s.associations)(d instanceof Zt||d instanceof yt)&&u.set(d,f);return h.traverse(d=>{let f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];wn[r.path]===wn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(wn[r.path]){case wn.weights:c=qi;break;case wn.rotation:c=Yi;break;case wn.position:case wn.scale:c=ji;break;default:n.itemSize===1?c=qi:c=ji;break}let h=s.interpolation!==void 0?pv[s.interpolation]:ws,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let m=new c(l[d]+"."+wn[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=ph(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Yi?dh:co;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function bv(i,e,t){let n=e.attributes,s=new Dt;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){let h=ph(zs[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new C,l=new C;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){let y=ph(zs[d.componentType]);l.multiplyScalar(y)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new St;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function yf(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=fh[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return Fe.workingColorSpace!==Tt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Fe.workingColorSpace}" not supported.`),$i(i,e),bv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?gv(i,e.targets,t):i})}var wh=class extends cf{constructor(i=Yn){super(),this.manager=i,this.adjustmentTransform=new ce}parse(i){let e=super.parse(i),t=e.glbBytes.slice().buffer;return new Promise((n,s)=>{let r=this.manager,a=this.fetchOptions,o=r.getHandler("path.gltf")||new En(r);a.credentials==="include"&&a.mode==="cors"&&o.setCrossOrigin("use-credentials"),"credentials"in a&&o.setWithCredentials(a.credentials==="include"),a.headers&&o.setRequestHeader(a.headers);let l=this.workingPath;!/[\\/]$/.test(l)&&l.length&&(l+="/");let c=this.adjustmentTransform;o.parse(t,l,h=>{let{batchTable:u,featureTable:d}=e,{scene:f}=h,m=d.getData("RTC_CENTER",1,"FLOAT","VEC3");m&&(f.position.x+=m[0],f.position.y+=m[1],f.position.z+=m[2]),h.scene.updateMatrix(),h.scene.matrix.multiply(c),h.scene.matrix.decompose(h.scene.position,h.scene.quaternion,h.scene.scale),h.batchTable=u,h.featureTable=d,f.batchTable=u,f.featureTable=d,n(h)},s)})}};function Mv(i){let e=i>>11,t=i>>5&63,n=i&31;return[Math.round(e/31*255),Math.round(t/63*255),Math.round(n/31*255)]}var Tr=new ve;function Sv(i,e,t=new C){Tr.set(i,e).divideScalar(256).multiplyScalar(2).subScalar(1),t.set(Tr.x,Tr.y,1-Math.abs(Tr.x)-Math.abs(Tr.y));let n=Ns.clamp(-t.z,0,1);return t.x>=0?t.setX(t.x-n):t.setX(t.x+n),t.y>=0?t.setY(t.y-n):t.setY(t.y+n),t.normalize(),t}var xf={RGB:"color",POSITION:"position"},Eh=class extends uf{constructor(i=Yn){super(),this.manager=i}parse(i){return super.parse(i).then(async e=>{let{featureTable:t,batchTable:n}=e,s=new _n,r=t.header.extensions,a=new C,o;if(r&&r["3DTILES_draco_point_compression"]){let{byteOffset:h,byteLength:u,properties:d}=r["3DTILES_draco_point_compression"],f=this.manager.getHandler("draco.drc");if(f==null)throw Error("PNTSLoader: dracoLoader not available.");let m={};for(let p in d)if(p in xf&&p in d){let T=xf[p];m[T]=d[p]}let y={attributeIDs:m,attributeTypes:{position:"Float32Array",color:"Uint8Array"},useUniqueIDs:!0},g=t.getBuffer(h,u);o=await f.decodeGeometry(g,y),o.attributes.color&&(s.vertexColors=!0)}else{let h=t.getData("POINTS_LENGTH"),u=t.getData("POSITION",h,"FLOAT","VEC3"),d=t.getData("NORMAL",h,"FLOAT","VEC3"),f=t.getData("NORMAL",h,"UNSIGNED_BYTE","VEC2"),m=t.getData("RGB",h,"UNSIGNED_BYTE","VEC3"),y=t.getData("RGBA",h,"UNSIGNED_BYTE","VEC4"),g=t.getData("RGB565",h,"UNSIGNED_SHORT","SCALAR"),p=t.getData("CONSTANT_RGBA",h,"UNSIGNED_BYTE","VEC4"),T=t.getData("POSITION_QUANTIZED",h,"UNSIGNED_SHORT","VEC3"),x=t.getData("QUANTIZED_VOLUME_SCALE",h,"FLOAT","VEC3"),v=t.getData("QUANTIZED_VOLUME_OFFSET",h,"FLOAT","VEC3");if(o=new _t,T){let P=new Float32Array(h*3);for(let E=0;E<h;E++)for(let A=0;A<3;A++){let R=3*E+A;P[R]=T[R]/65535*x[A]}a.x=v[0],a.y=v[1],a.z=v[2],o.setAttribute("position",new je(P,3,!1))}else o.setAttribute("position",new je(u,3,!1));if(d!==null)o.setAttribute("normal",new je(d,3,!1));else if(f!==null){let P=new Float32Array(h*3),E=new C;for(let A=0;A<h;A++){let R=f[A*2],S=f[A*2+1],M=Sv(R,S,E);P[A*3]=M.x,P[A*3+1]=M.y,P[A*3+2]=M.z}o.setAttribute("normal",new je(P,3,!1))}if(y!==null)o.setAttribute("color",new je(y,4,!0)),s.vertexColors=!0,s.transparent=!0,s.depthWrite=!1;else if(m!==null)o.setAttribute("color",new je(m,3,!0)),s.vertexColors=!0;else if(g!==null){let P=new Uint8Array(h*3);for(let E=0;E<h;E++){let A=Mv(g[E]);for(let R=0;R<3;R++){let S=3*E+R;P[S]=A[R]}}o.setAttribute("color",new je(P,3,!0)),s.vertexColors=!0}else if(p!==null){s.color=new Se(p[0],p[1],p[2]);let P=p[3]/255;P<1&&(s.opacity=P,s.transparent=!0,s.depthWrite=!1)}}let l=new qn(o,s);l.position.copy(a),e.scene=l,e.scene.featureTable=t,e.scene.batchTable=n;let c=t.getData("RTC_CENTER",1,"FLOAT","VEC3");return c&&(e.scene.position.x+=c[0],e.scene.position.y+=c[1],e.scene.position.z+=c[2]),e})}};function Tv(i){let{x:e,y:t,z:n}=i;i.x=n,i.y=e,i.z=t}function wv(i){return-i+Math.PI/2}var vf=new Xa,An=new C,Bt=new C,gh=new C,hi=new ce,Ri=new ce,yh=new St,Gt=new oi,bf=new C,Mf=new C,Sf=new C,wr=new C,ho=new ai,Ev=1e-12,Av=.1;var Ah=class{constructor(i=1,e=1,t=1){this.isEllipsoid=!0,this.name="",this.radius=new C(i,e,t)}intersectRay(i,e){return hi.makeScale(...this.radius).invert(),yh.center.set(0,0,0),yh.radius=1,ho.copy(i).applyMatrix4(hi),ho.intersectSphere(yh,e)?(hi.makeScale(...this.radius),e.applyMatrix4(hi),e):null}getEastNorthUpFrame(i,e,t,n){return t.isMatrix4&&(n=t,t=0,console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')),this.getEastNorthUpAxes(i,e,bf,Mf,Sf),this.getCartographicToPosition(i,e,t,wr),n.makeBasis(bf,Mf,Sf).setPosition(wr)}getOrientedEastNorthUpFrame(i,e,t,n,s,r,a){return this.getObjectFrame(i,e,t,n,s,r,a,0)}getObjectFrame(i,e,t,n,s,r,a,o=2){return this.getEastNorthUpFrame(i,e,t,hi),Gt.set(s,r,-n,"ZXY"),a.makeRotationFromEuler(Gt).premultiply(hi),o===1?(Gt.set(Math.PI/2,0,0,"XYZ"),Ri.makeRotationFromEuler(Gt),a.multiply(Ri)):o===2&&(Gt.set(-Math.PI/2,0,Math.PI,"XYZ"),Ri.makeRotationFromEuler(Gt),a.multiply(Ri)),a}getCartographicFromObjectFrame(i,e,t=2){return t===1?(Gt.set(-Math.PI/2,0,0,"XYZ"),Ri.makeRotationFromEuler(Gt).premultiply(i)):t===2?(Gt.set(-Math.PI/2,0,Math.PI,"XYZ"),Ri.makeRotationFromEuler(Gt).premultiply(i)):Ri.copy(i),wr.setFromMatrixPosition(Ri),this.getPositionToCartographic(wr,e),this.getEastNorthUpFrame(e.lat,e.lon,0,hi).invert(),Ri.premultiply(hi),Gt.setFromRotationMatrix(Ri,"ZXY"),e.azimuth=-Gt.z,e.elevation=Gt.x,e.roll=Gt.y,e}getEastNorthUpAxes(i,e,t,n,s,r=wr){this.getCartographicToPosition(i,e,0,r),this.getCartographicToNormal(i,e,s),t.set(-r.y,r.x,0).normalize(),n.crossVectors(s,t).normalize()}getCartographicToPosition(i,e,t,n){this.getCartographicToNormal(i,e,An);let s=this.radius;Bt.copy(An),Bt.x*=s.x**2,Bt.y*=s.y**2,Bt.z*=s.z**2;let r=Math.sqrt(An.dot(Bt));return Bt.divideScalar(r),n.copy(Bt).addScaledVector(An,t)}getPositionToCartographic(i,e){this.getPositionToSurfacePoint(i,Bt),this.getPositionToNormal(Bt,An);let t=gh.subVectors(i,Bt);return e.lon=Math.atan2(An.y,An.x),e.lat=Math.asin(An.z),e.height=Math.sign(t.dot(i))*t.length(),e}getCartographicToNormal(i,e,t){return vf.set(1,wv(i),e),t.setFromSpherical(vf).normalize(),Tv(t),t}getPositionToNormal(i,e){let t=this.radius;return e.copy(i),e.x/=t.x**2,e.y/=t.y**2,e.z/=t.z**2,e.normalize(),e}getPositionToSurfacePoint(i,e){let t=this.radius,n=1/t.x**2,s=1/t.y**2,r=1/t.z**2,a=i.x*i.x*n,o=i.y*i.y*s,l=i.z*i.z*r,c=a+o+l,h=Math.sqrt(1/c),u=Bt.copy(i).multiplyScalar(h);if(c<Av)return isFinite(h)?e.copy(u):null;let d=gh.set(u.x*n*2,u.y*s*2,u.z*r*2),f=(1-h)*i.length()/(.5*d.length()),m=0,y,g,p,T,x,v,P,E,A,R,S;do{f-=m,p=1/(1+f*n),T=1/(1+f*s),x=1/(1+f*r),v=p*p,P=T*T,E=x*x,A=v*p,R=P*T,S=E*x,y=a*v+o*P+l*E-1,g=a*A*n+o*R*s+l*S*r;let M=-2*g;m=y/M}while(Math.abs(y)>Ev);return e.set(i.x*p,i.y*T,i.z*x)}calculateHorizonDistance(i,e){let t=this.calculateEffectiveRadius(i);return Math.sqrt(2*t*e+e**2)}calculateEffectiveRadius(i){let e=this.radius.x,t=1-this.radius.z**2/e**2,n=i*Ns.DEG2RAD,s=Math.sin(n)**2;return e/Math.sqrt(1-t*s)}getPositionElevation(i){this.getPositionToSurfacePoint(i,Bt);let e=gh.subVectors(i,Bt);return Math.sign(e.dot(i))*e.length()}closestPointToRayEstimate(i,e){return this.intersectRay(i,e)?e:(hi.makeScale(...this.radius).invert(),ho.copy(i).applyMatrix4(hi),Bt.set(0,0,0),ho.closestPointToPoint(Bt,e).normalize(),hi.makeScale(...this.radius),e.applyMatrix4(hi))}copy(i){return this.radius.copy(i.radius),this}clone(){return new this.constructor().copy(this)}},Pr=new Ah(Bs,Bs,Kd);Pr.name="WGS84 Earth";var uo=new C,Vs=new C,Hs=new C,_h=new C,fo=new Rt,po=new C,Gs=new ce,Tf=new ce,wf=new C,Ef=new ce,xh=new Rt,vh={};function Af(i,e,t,n){if(i=i/t*2-1,e=e/t*2-1,n.x=i,n.y=e,n.z=1-Math.abs(i)-Math.abs(e),n.z<0){let s=n.x;n.x=(1-Math.abs(n.y))*(s>=0?1:-1),n.y=(1-Math.abs(s))*(n.y>=0?1:-1)}return n.normalize(),n}var Ch=class extends hf{constructor(i=Yn){super(),this.manager=i,this.adjustmentTransform=new ce,this.ellipsoid=Pr.clone()}resolveExternalURL(i){return this.manager.resolveURL(super.resolveExternalURL(i))}parse(i){return super.parse(i).then(e=>{let{featureTable:t,batchTable:n}=e,s=e.glbBytes.slice().buffer;return new Promise((r,a)=>{let o=this.fetchOptions,l=this.manager,c=l.getHandler("path.gltf")||new En(l);o.credentials==="include"&&o.mode==="cors"&&c.setCrossOrigin("use-credentials"),"credentials"in o&&c.setWithCredentials(o.credentials==="include"),o.headers&&c.setRequestHeader(o.headers);let h=e.gltfWorkingPath??this.workingPath;/[\\/]$/.test(h)||(h+="/");let u=this.adjustmentTransform;c.parse(s,h,d=>{let f=t.getData("INSTANCES_LENGTH"),m=t.getData("POSITION",f,"FLOAT","VEC3"),y=t.getData("POSITION_QUANTIZED",f,"UNSIGNED_SHORT","VEC3"),g=t.getData("QUANTIZED_VOLUME_OFFSET",1,"FLOAT","VEC3"),p=t.getData("QUANTIZED_VOLUME_SCALE",1,"FLOAT","VEC3"),T=t.getData("NORMAL_UP",f,"FLOAT","VEC3"),x=t.getData("NORMAL_RIGHT",f,"FLOAT","VEC3"),v=t.getData("NORMAL_UP_OCT32P",f,"UNSIGNED_SHORT","VEC2"),P=t.getData("NORMAL_RIGHT_OCT32P",f,"UNSIGNED_SHORT","VEC2"),E=t.getData("SCALE_NON_UNIFORM",f,"FLOAT","VEC3"),A=t.getData("SCALE",f,"FLOAT","SCALAR"),R=t.getData("RTC_CENTER",1,"FLOAT","VEC3"),S=t.getData("EAST_NORTH_UP");if(!m&&y){m=new Float32Array(f*3);for(let O=0;O<f;O++)m[O*3+0]=g[0]+y[O*3+0]/65535*p[0],m[O*3+1]=g[1]+y[O*3+1]/65535*p[1],m[O*3+2]=g[2]+y[O*3+2]/65535*p[2]}let M=new C;for(let O=0;O<f;O++)M.x+=m[O*3+0]/f,M.y+=m[O*3+1]/f,M.z+=m[O*3+2]/f;let I=[],W=[];d.scene.updateMatrixWorld(),d.scene.traverse(O=>{if(O.isMesh){W.push(O);let{geometry:G,material:$}=O,V=new Rs(G,$,f);V.position.copy(M),R&&(V.position.x+=R[0],V.position.y+=R[1],V.position.z+=R[2]),I.push(V)}});for(let O=0;O<f;O++){_h.set(m[O*3+0]-M.x,m[O*3+1]-M.y,m[O*3+2]-M.z),fo.identity(),T&&x?(Vs.set(T[O*3+0],T[O*3+1],T[O*3+2]),Hs.set(x[O*3+0],x[O*3+1],x[O*3+2]),uo.crossVectors(Hs,Vs).normalize(),Gs.makeBasis(Hs,Vs,uo),fo.setFromRotationMatrix(Gs)):v&&P&&(Af(v[O*2+0],v[O*2+1],65535,Vs),Af(P[O*2+0],P[O*2+1],65535,Hs),uo.crossVectors(Hs,Vs).normalize(),Gs.makeBasis(Hs,Vs,uo),fo.setFromRotationMatrix(Gs)),po.set(1,1,1),E&&po.set(E[O*3+0],E[O*3+1],E[O*3+2]),A&&po.multiplyScalar(A[O]);for(let G=0,$=I.length;G<$;G++){let V=I[G];xh.copy(fo),S&&(V.updateMatrixWorld(),wf.copy(_h).applyMatrix4(V.matrixWorld),this.ellipsoid.getPositionToCartographic(wf,vh),this.ellipsoid.getEastNorthUpFrame(vh.lat,vh.lon,Ef),xh.setFromRotationMatrix(Ef)),Gs.compose(_h,xh,po).multiply(u);let K=W[G];Tf.multiplyMatrices(Gs,K.matrixWorld),V.setMatrixAt(O,Tf)}}d.scene.clear(),d.scene.add(...I),d.batchTable=n,d.featureTable=t,d.scene.batchTable=n,d.scene.featureTable=t,r(d)},a)})})}},Uf=class extends df{constructor(i=Yn){super(),this.manager=i,this.adjustmentTransform=new ce,this.ellipsoid=Pr.clone()}parse(i){let e=super.parse(i),{manager:t,ellipsoid:n,adjustmentTransform:s}=this,r=[];for(let a in e.tiles){let{type:o,buffer:l}=e.tiles[a];switch(o){case"b3dm":{let c=l.slice(),h=new wh(t);h.workingPath=this.workingPath,h.fetchOptions=this.fetchOptions,h.adjustmentTransform.copy(s);let u=h.parse(c.buffer);r.push(u);break}case"pnts":{let c=l.slice(),h=new Eh(t);h.workingPath=this.workingPath,h.fetchOptions=this.fetchOptions;let u=h.parse(c.buffer);r.push(u);break}case"i3dm":{let c=l.slice(),h=new Ch(t);h.workingPath=this.workingPath,h.fetchOptions=this.fetchOptions,h.ellipsoid.copy(n),h.adjustmentTransform.copy(s);let u=h.parse(c.buffer);r.push(u);break}}}return Promise.all(r).then(a=>{let o=new At;return a.forEach(l=>{o.add(l.scene)}),{tiles:a,scene:o}})}},Er=new ce,Cv=class extends At{constructor(i){super(),this.isTilesGroup=!0,this.name="TilesRenderer.TilesGroup",this.tilesRenderer=i,this.matrixWorldInverse=new ce}raycast(i,e){return this.tilesRenderer.raycast(i,e),!1}updateMatrixWorld(i){if(this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldNeedsUpdate||i){this.parent===null?Er.copy(this.matrix):Er.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1;let e=Er.elements,t=this.matrixWorld.elements,n=!1;for(let s=0;s<16;s++){let r=e[s],a=t[s];if(Math.abs(r-a)>2**-52){n=!0;break}}if(n){this.matrixWorld.copy(Er),this.matrixWorldInverse.copy(Er).invert();let s=this.children;for(let l=0,c=s.length;l<c;l++)s[l].updateMatrixWorld();let{tilesRenderer:r}=this,{activeTiles:a,visibleTiles:o}=r;a.forEach(l=>{o.has(l)||l.engineData.scene.updateMatrixWorld(!0)})}}}updateWorldMatrix(i,e){this.parent&&i&&this.parent.updateWorldMatrix(i,!1),this.updateMatrixWorld(!0)}},Rv=new ai;function Pv(i,e,t,n){let{scene:s}=i.engineData;t.invokeOnePlugin(r=>r.raycastTile&&r.raycastTile(i,s,e,n))||e.intersectObject(s,!0,n)}function Iv(i){return"traversal"in i}function Nf(i,e,t,n,s=null){if(!Iv(e))return;let{group:r,activeTiles:a}=i,{boundingVolume:o}=e.engineData;if(s===null&&(s=Rv,s.copy(t.ray).applyMatrix4(r.matrixWorldInverse)),!e.traversal.used||!o.intersectsRay(s))return;a.has(e)&&Pv(e,t,i,n);let l=e.children;for(let c=0,h=l.length;c<h;c++)Nf(i,l[c],t,n,s)}var mo=new C,go=new C,Wt=new C,yo=new ai,Sh=class{constructor(i=new Dt,e=new ce){this.box=i.clone(),this.transform=e.clone(),this.inverseTransform=new ce,this.points=Array(8).fill().map(()=>new C),this.planes=[,,,,,,].fill().map(()=>new gi)}copy(i){return this.box.copy(i.box),this.transform.copy(i.transform),this.update(),this}clone(){return new this.constructor().copy(this)}clampPoint(i,e){return e.copy(i).applyMatrix4(this.inverseTransform).clamp(this.box.min,this.box.max).applyMatrix4(this.transform)}distanceToPoint(i){return this.clampPoint(i,Wt).distanceTo(i)}containsPoint(i){return Wt.copy(i).applyMatrix4(this.inverseTransform),this.box.containsPoint(Wt)}intersectsRay(i){return yo.copy(i).applyMatrix4(this.inverseTransform),yo.intersectsBox(this.box)}intersectRay(i,e){return yo.copy(i).applyMatrix4(this.inverseTransform),yo.intersectBox(this.box,e)?(e.applyMatrix4(this.transform),e):null}update(){let{points:i,inverseTransform:e,transform:t,box:n}=this;e.copy(t).invert();let{min:s,max:r}=n,a=0;for(let o=-1;o<=1;o+=2)for(let l=-1;l<=1;l+=2)for(let c=-1;c<=1;c+=2)i[a].set(o<0?s.x:r.x,l<0?s.y:r.y,c<0?s.z:r.z).applyMatrix4(t),a++;this.updatePlanes()}updatePlanes(){mo.copy(this.box.min).applyMatrix4(this.transform),go.copy(this.box.max).applyMatrix4(this.transform),Wt.set(0,0,1).transformDirection(this.transform),this.planes[0].setFromNormalAndCoplanarPoint(Wt,mo),this.planes[1].setFromNormalAndCoplanarPoint(Wt,go).negate(),Wt.set(0,1,0).transformDirection(this.transform),this.planes[2].setFromNormalAndCoplanarPoint(Wt,mo),this.planes[3].setFromNormalAndCoplanarPoint(Wt,go).negate(),Wt.set(1,0,0).transformDirection(this.transform),this.planes[4].setFromNormalAndCoplanarPoint(Wt,mo),this.planes[5].setFromNormalAndCoplanarPoint(Wt,go).negate()}intersectsSphere(i){return this.clampPoint(i.center,Wt),Wt.distanceToSquared(i.center)<=i.radius*i.radius}intersectsFrustum(i){return this._intersectsPlaneShape(i.planes,i.points)}intersectsOBB(i){return this._intersectsPlaneShape(i.planes,i.points)}_intersectsPlaneShape(i,e){let t=this.points,n=this.planes;for(let s=0;s<6;s++){let r=i[s],a=-1/0;for(let o=0;o<8;o++){let l=t[o],c=r.distanceToPoint(l);a=a<c?c:a}if(a<0)return!1}for(let s=0;s<6;s++){let r=n[s],a=-1/0;for(let o=0;o<8;o++){let l=e[o],c=r.distanceToPoint(l);a=a<c?c:a}if(a<0)return!1}return!0}},Rr=Math.PI,bh=Rr/2,Ar=new C,$n=new C,Mi=new C,Ce=new C,kt=new ce,Lv=new Dt,Cf=new ce;function Cn(i,e){e.radius=Math.max(e.radius,i.distanceToSquared(e.center))}function Rf(i){return i.x!==i.y}var Of=class extends Ah{constructor(i=1,e=1,t=1,n=-bh,s=bh,r=0,a=2*Rr,o=0,l=0){super(i,e,t),this.latStart=n,this.latEnd=s,this.lonStart=r,this.lonEnd=a,this.heightStart=o,this.heightEnd=l}getBoundingBox(i,e){Rf(this.radius)&&console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");let{latStart:t,latEnd:n,lonStart:s,lonEnd:r,heightStart:a,heightEnd:o}=this,l=(t+n)*.5,c=(s+r)*.5,h=t>0,u=n<0,d;d=h?t:u?n:0;let{min:f,max:m}=i;f.setScalar(1/0),m.setScalar(-1/0),r-s<=Rr?(this.getCartographicToNormal(l,c,Mi),$n.set(0,0,1),Ar.crossVectors($n,Mi).normalize(),$n.crossVectors(Mi,Ar).normalize(),e.makeBasis(Ar,$n,Mi),kt.copy(e).invert(),this.getCartographicToPosition(d,s,o,Ce).applyMatrix4(kt),m.x=Math.abs(Ce.x),f.x=-m.x,this.getCartographicToPosition(n,s,o,Ce).applyMatrix4(kt),m.y=Ce.y,this.getCartographicToPosition(n,c,o,Ce).applyMatrix4(kt),m.y=Math.max(Ce.y,m.y),this.getCartographicToPosition(t,s,o,Ce).applyMatrix4(kt),f.y=Ce.y,this.getCartographicToPosition(t,c,o,Ce).applyMatrix4(kt),f.y=Math.min(Ce.y,f.y),this.getCartographicToPosition(l,c,o,Ce).applyMatrix4(kt),m.z=Ce.z,this.getCartographicToPosition(t,s,a,Ce).applyMatrix4(kt),f.z=Ce.z,this.getCartographicToPosition(n,s,a,Ce).applyMatrix4(kt),f.z=Math.min(Ce.z,f.z)):(this.getCartographicToPosition(d,c,o,Mi),Mi.z=0,Mi.length()<1e-10?Mi.set(1,0,0):Mi.normalize(),$n.set(0,0,1),Ar.crossVectors(Mi,$n).normalize(),e.makeBasis(Ar,$n,Mi),kt.copy(e).invert(),this.getCartographicToPosition(d,c+bh,o,Ce).applyMatrix4(kt),m.x=Math.abs(Ce.x),f.x=-m.x,this.getCartographicToPosition(n,0,u?a:o,Ce).applyMatrix4(kt),m.y=Ce.y,this.getCartographicToPosition(t,0,h?a:o,Ce).applyMatrix4(kt),f.y=Ce.y,this.getCartographicToPosition(d,c,o,Ce).applyMatrix4(kt),m.z=Ce.z,this.getCartographicToPosition(d,r,o,Ce).applyMatrix4(kt),f.z=Ce.z),i.getCenter(Ce),i.min.sub(Ce).multiplyScalar(1.0000000000001),i.max.sub(Ce).multiplyScalar(1.0000000000001),Ce.applyMatrix4(e),e.setPosition(Ce)}getBoundingSphere(i){Rf(this.radius)&&console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."),this.getBoundingBox(Lv,Cf),i.center.setFromMatrixPosition(Cf),i.radius=0;let{latStart:e,latEnd:t,lonStart:n,lonEnd:s,heightStart:r,heightEnd:a}=this,o=(e+t)*.5,l=(n+s)*.5,c=e>0,h=t<0,u;u=c?e:h?t:0,this.getCartographicToPosition(u,n,a,Ce),Cn(Ce,i),this.getCartographicToPosition(t,n,a,Ce),Cn(Ce,i),this.getCartographicToPosition(t,l,a,Ce),Cn(Ce,i),this.getCartographicToPosition(e,n,a,Ce),Cn(Ce,i),this.getCartographicToPosition(e,l,a,Ce),Cn(Ce,i),this.getCartographicToPosition(o,l,a,Ce),Cn(Ce,i),this.getCartographicToPosition(e,n,r,Ce),Cn(Ce,i),s-n>Rr&&(this.getCartographicToPosition(u,l+Rr,a,Ce),Cn(Ce,i)),i.radius=Math.sqrt(i.radius)*1.0000000000001}},Ji=new C,Ki=new C,Qi=new C,Pf=new C,If=new C,Dv=class{constructor(){this.sphere=null,this.obb=null,this.region=null,this.regionObb=null}intersectsRay(i){let e=this.sphere,t=this.obb||this.regionObb;return!(e&&!i.intersectsSphere(e)||t&&!t.intersectsRay(i))}intersectRay(i,e=null){let t=this.sphere,n=this.obb||this.regionObb,s=-1/0,r=-1/0;t&&i.intersectSphere(t,Pf)&&(s=t.containsPoint(i.origin)?0:i.origin.distanceToSquared(Pf)),n&&n.intersectRay(i,If)&&(r=n.containsPoint(i.origin)?0:i.origin.distanceToSquared(If));let a=Math.max(s,r);return a===-1/0?null:(i.at(Math.sqrt(a),e),e)}distanceToPoint(i){let e=this.sphere,t=this.obb||this.regionObb,n=-1/0,s=-1/0;return e&&(n=Math.max(e.distanceToPoint(i),0)),t&&(s=t.distanceToPoint(i)),n>s?n:s}intersectsFrustum(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!i.intersectsSphere(t)||e&&!e.intersectsFrustum(i)?!1:!!(t||e)}intersectsSphere(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!t.intersectsSphere(i)||e&&!e.intersectsSphere(i)?!1:!!(t||e)}intersectsOBB(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!i.intersectsSphere(t)||e&&!e.intersectsOBB(i)?!1:!!(t||e)}getOBB(i,e){let t=this.obb||this.regionObb;t?(i.copy(t.box),e.copy(t.transform)):(this.getAABB(i),e.identity())}getAABB(i){if(this.sphere)this.sphere.getBoundingBox(i);else{let e=this.obb||this.regionObb;i.copy(e.box).applyMatrix4(e.transform)}}getSphere(i){if(this.sphere)i.copy(this.sphere);else if(this.region)this.region.getBoundingSphere(i);else{let e=this.obb||this.regionObb;e.box.getBoundingSphere(i),i.applyMatrix4(e.transform)}}setObbData(i,e){let t=new Sh;Ji.set(i[3],i[4],i[5]),Ki.set(i[6],i[7],i[8]),Qi.set(i[9],i[10],i[11]);let n=Ji.length(),s=Ki.length(),r=Qi.length();Ji.normalize(),Ki.normalize(),Qi.normalize(),n===0&&Ji.crossVectors(Ki,Qi),s===0&&Ki.crossVectors(Ji,Qi),r===0&&Qi.crossVectors(Ji,Ki),t.transform.set(Ji.x,Ki.x,Qi.x,i[0],Ji.y,Ki.y,Qi.y,i[1],Ji.z,Ki.z,Qi.z,i[2],0,0,0,1).premultiply(e),t.box.min.set(-n,-s,-r),t.box.max.set(n,s,r),t.update(),this.obb=t}setSphereData(i,e,t,n,s){let r=new St;r.center.set(i,e,t),r.radius=n,r.applyMatrix4(s),this.sphere=r}setRegionData(i,e,t,n,s,r,a){let o=new Of(...i.radius,t,s,e,n,r,a),l=new Sh;o.getBoundingBox(l.box,l.transform),l.update(),this.region=o,this.regionObb=l}},Uv=new Pe;function Nv(i,e,t,n){let s=Uv.set(i.normal.x,i.normal.y,i.normal.z,e.normal.x,e.normal.y,e.normal.z,t.normal.x,t.normal.y,t.normal.z);return n.set(-i.constant,-e.constant,-t.constant),n.applyMatrix3(s.invert()),n}var Ov=class extends gn{constructor(){super(),this.points=Array(8).fill().map(()=>new C)}setFromProjectionMatrix(...i){return super.setFromProjectionMatrix(...i),this.calculateFrustumPoints(),this}calculateFrustumPoints(){let{planes:i,points:e}=this;[[i[0],i[3],i[4]],[i[1],i[3],i[4]],[i[0],i[2],i[4]],[i[1],i[2],i[4]],[i[0],i[3],i[5]],[i[1],i[3],i[5]],[i[0],i[2],i[5]],[i[1],i[2],i[5]]].forEach((t,n)=>{Nv(t[0],t[1],t[2],e[n])})}};var Th=0;function Lf(i,e,t,n){try{return Ic.getByteLength(i,e,t,n)}catch{return Th}}function Fv(i){if(!i)return 0;if(i.isExternalTexture)return i.userData?.byteLength??Th;let{format:e,type:t,image:n,mipmaps:s}=i;if(i.isCompressedTexture&&Array.isArray(s)&&s.length>0){let a=0;for(let o of s)o?.data?.byteLength?a+=o.data.byteLength:a+=Lf(o.width,o.height,e,t);return a}if(!n)return Th;let r=Lf(n.width,n.height,e,t);return r*=i.generateMipmaps?4/3:1,r}function Bv(i){let e=new Set,t=0;return i.traverse(n=>{if(n.geometry&&!e.has(n.geometry)&&(t+=ff(n.geometry),e.add(n.geometry)),n.material){let s=n.material;for(let r in s){let a=s[r];a&&a.isTexture&&!e.has(a)&&(t+=Fv(a),e.add(a))}}}),t}var Ff=Symbol("INITIAL_FRUSTUM_CULLED"),_o=new ce,Cr=new C,Mh=new ve,kv=new C(1,0,0),zv=new C(0,1,0),Vv=()=>null;function Df(i,e){i.traverse(t=>{t.frustumCulled=t[Ff]&&e})}var Rh=class extends of{get autoDisableRendererCulling(){return this._autoDisableRendererCulling}set autoDisableRendererCulling(i){this._autoDisableRendererCulling!==i&&(super._autoDisableRendererCulling=i,this.forEachLoadedModel(e=>{Df(e,!i)}))}constructor(...i){super(...i),this.accelerateRaycast=!0,this.group=new Cv(this),this.ellipsoid=Pr.clone(),this.surface=this.ellipsoid,this.cameras=[],this.cameraMap=new Map,this.cameraInfo=[],this._upRotationMatrix=new ce,this._bytesUsed=new WeakMap,this._autoDisableRendererCulling=!0,this.manager=new gr,this._listeners={}}addEventListener(i,e){Ht.prototype.addEventListener.call(this,i,e)}hasEventListener(i,e){return Ht.prototype.hasEventListener.call(this,i,e)}removeEventListener(i,e){Ht.prototype.removeEventListener.call(this,i,e)}dispatchEvent(i){Ht.prototype.dispatchEvent.call(this,i)}getBoundingBox(i){if(!this.root)return!1;let e=this.root.engineData.boundingVolume;return e?(e.getAABB(i),!0):!1}getOrientedBoundingBox(i,e){if(!this.root)return!1;let t=this.root.engineData.boundingVolume;return t?(t.getOBB(i,e),!0):!1}getBoundingSphere(i){if(!this.root)return!1;let e=this.root.engineData.boundingVolume;return e?(e.getSphere(i),!0):!1}forEachLoadedModel(i){this.traverse(e=>{let t=e.engineData&&e.engineData.scene;t&&i(t,e)},null,!1)}raycast(i,e){if(this.root)if(this.accelerateRaycast)Nf(this,this.root,i,e);else{let t=i.firstHitOnly?[]:e;for(let n of this.activeTiles){let{scene:s}=n.engineData;this.invokeOnePlugin(r=>r.raycastTile&&r.raycastTile(n,s,i,t))||i.intersectObject(s,!0,t)}i.firstHitOnly&&t.length>0&&(t.sort((n,s)=>n.distance-s.distance),e.push(t[0]))}}hasCamera(i){return this.cameraMap.has(i)}setCamera(i){let e=this.cameras,t=this.cameraMap;return!t.has(i)&&(t.set(i,new ve),e.push(i),this.dispatchEvent({type:"add-camera",camera:i}),!0)}setResolution(i,e,t){let n=this.cameraMap;if(!n.has(i))return!1;let s=e.isVector2?e.x:e,r=e.isVector2?e.y:t,a=n.get(i);return(a.width!==s||a.height!==r)&&(a.set(s,r),this.dispatchEvent({type:"camera-resolution-change"})),!0}getResolution(i,e){let t=this.cameraMap.get(i);return t?e.copy(t):null}setResolutionFromRenderer(i,e){return e.getSize(Mh),this.setResolution(i,Mh.x,Mh.y)}deleteCamera(i){let e=this.cameras,t=this.cameraMap;if(t.has(i)){let n=e.indexOf(i);return e.splice(n,1),t.delete(i),this.dispatchEvent({type:"delete-camera",camera:i}),!0}return!1}loadRootTileset(...i){return super.loadRootTileset(...i).then(e=>{let{asset:t,extensions:n={}}=e;switch((t&&t.gltfUpAxis||"y").toLowerCase()){case"x":this._upRotationMatrix.makeRotationAxis(zv,-Math.PI/2);break;case"y":this._upRotationMatrix.makeRotationAxis(kv,Math.PI/2)}if("3DTILES_ellipsoid"in n){let s=n["3DTILES_ellipsoid"],{ellipsoid:r}=this;r.name=s.body,s.radii?r.radius.set(...s.radii):r.radius.set(1,1,1)}return e})}prepareForTraversal(){let i=this.group,e=this.cameras,t=this.cameraMap,n=this.cameraInfo;for(;n.length>e.length;)n.pop();for(;n.length<e.length;)n.push({frustum:new Ov,isOrthographic:!1,sseDenominator:-1,position:new C,invScale:-1,pixelSize:0});Cr.setFromMatrixScale(i.matrixWorldInverse),Math.abs(Math.max(Cr.x-Cr.y,Cr.x-Cr.z))>1e-6&&console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");for(let s=0,r=n.length;s<r;s++){let a=e[s],o=n[s],l=o.frustum,c=o.position,h=t.get(a);(h.width===0||h.height===0)&&console.warn("TilesRenderer: resolution for camera error calculation is not set.");let u=a.projectionMatrix.elements;if(o.isOrthographic=u[15]===1,o.isOrthographic){let d=2/u[0],f=2/u[5];o.pixelSize=Math.max(f/h.height,d/h.width)}else o.sseDenominator=2/u[5]/h.height;_o.copy(i.matrixWorld),_o.premultiply(a.matrixWorldInverse),_o.premultiply(a.projectionMatrix),l.setFromProjectionMatrix(_o,a.coordinateSystem,a.reversedDepth),c.set(0,0,0),c.applyMatrix4(a.matrixWorld),c.applyMatrix4(i.matrixWorldInverse)}}update(){if(super.update(),this.cameras.length===0&&this.root){let i=!1;this.invokeAllPlugins(e=>i||=!!(e!==this&&e.calculateTileViewError)),i===!1&&console.warn("TilesRenderer: no cameras defined. Cannot update 3d tiles.")}}preprocessNode(i,e,t=null){super.preprocessNode(i,e,t);let n=new ce;if(i.transform){let a=i.transform;for(let o=0;o<16;o++)n.elements[o]=a[o]}t&&n.premultiply(t.engineData.transform);let s=new ce().copy(n).invert(),r=new Dv;"sphere"in i.boundingVolume&&r.setSphereData(...i.boundingVolume.sphere,n),"box"in i.boundingVolume&&r.setObbData(i.boundingVolume.box,n),"region"in i.boundingVolume&&r.setRegionData(this.ellipsoid,...i.boundingVolume.region),i.engineData.transform=n,i.engineData.transformInverse=s,i.engineData.boundingVolume=r,i.engineData.geometry=null,i.engineData.materials=null,i.engineData.textures=null,i.toJSON=Vv}async parseTile(i,e,t,n,s){let r=e.engineData,a=oo(n),o=this.fetchOptions,l=this.manager,c=null,h=r.transform,u=this._upRotationMatrix,d=(Tn(i)||t).toLowerCase();switch(d){case"b3dm":{let x=new wh(l);x.workingPath=a,x.fetchOptions=o,x.adjustmentTransform.copy(u),c=x.parse(i);break}case"pnts":{let x=new Eh(l);x.workingPath=a,x.fetchOptions=o,c=x.parse(i);break}case"i3dm":{let x=new Ch(l);x.workingPath=a,x.fetchOptions=o,x.adjustmentTransform.copy(u),x.ellipsoid.copy(this.ellipsoid),c=x.parse(i);break}case"cmpt":{let x=new Uf(l);x.workingPath=a,x.fetchOptions=o,x.adjustmentTransform.copy(u),x.ellipsoid.copy(this.ellipsoid),c=x.parse(i).then(v=>v.scene);break}case"gltf":case"glb":{let x=l.getHandler("path.gltf")||l.getHandler("path.glb")||new En(l);x.setWithCredentials(o.credentials==="include"),x.setRequestHeader(o.headers||{}),o.credentials==="include"&&o.mode==="cors"&&x.setCrossOrigin("use-credentials");let v=x.resourcePath||x.path||a;!/[\\/]$/.test(v)&&v.length&&(v+="/"),c=x.parseAsync(i,v).then(P=>{P.scene=P.scene||new At;let{scene:E}=P;return E.updateMatrix(),E.matrix.multiply(u).decompose(E.position,E.quaternion,E.scale),P});break}default:c=this.invokeOnePlugin(x=>x.parseToMesh&&x.parseToMesh(i,e,t,n,s))}let f=await c;if(f===null)throw Error(`TilesRenderer: Content type "${d}" not supported.`);let m,y;f.isObject3D?(m=f,y=null):(m=f.scene,y=f),m.updateMatrix(),m.matrix.premultiply(h),m.matrix.decompose(m.position,m.quaternion,m.scale),await this.invokeAllPlugins(x=>x.processTileModel&&x.processTileModel(m,e)),m.traverse(x=>{x[Ff]=x.frustumCulled,x.userData.tile=e}),Df(m,!this.autoDisableRendererCulling);let g=[],p=[],T=[];if(m.traverse(x=>{if(x.geometry&&p.push(x.geometry),x.material){let v=x.material;g.push(x.material);for(let P in v){let E=v[P];E&&E.isTexture&&T.push(E)}}}),s.aborted)for(let x=0,v=T.length;x<v;x++){let P=T[x];P.image instanceof ImageBitmap&&P.image.close(),P.dispose()}else r.materials=g,r.geometry=p,r.textures=T,r.scene=m,r.metadata=y}disposeTile(i){super.disposeTile(i);let e=i.engineData;if(e.scene){let t=e.materials,n=e.geometry,s=e.textures,r=e.scene.parent;e.scene.traverse(a=>{a.userData.meshFeatures&&a.userData.meshFeatures.dispose(),a.userData.structuralMetadata&&a.userData.structuralMetadata.dispose()});for(let a=0,o=n.length;a<o;a++)n[a].dispose();for(let a=0,o=t.length;a<o;a++)t[a].dispose();for(let a=0,o=s.length;a<o;a++){let l=s[a];l.image instanceof ImageBitmap&&l.image.close(),l.dispose()}r&&r.remove(e.scene),e.scene=null,e.materials=null,e.textures=null,e.geometry=null,e.metadata=null}}setTileActive(i,e){super.setTileActive(i,e);let t=i.engineData.scene;t&&(e?(t.parent=this.group,t.updateMatrixWorld(!0)):this.visibleTiles.has(i)||(t.parent=null))}setTileVisible(i,e){let t=i.engineData.scene,{activeTiles:n,group:s}=this;t&&(e?s.add(t):(s.remove(t),n.has(i)&&(t.parent=s))),super.setTileVisible(i,e)}calculateBytesUsed(i,e){let t=this._bytesUsed;return!t.has(i)&&e&&t.set(i,Bv(e)),t.get(i)??null}calculateTileViewError(i,e){let t=i.engineData,n=this.cameras,s=this.cameraInfo,r=t.boundingVolume,a=!1,o=0,l=1/0,c=0,h=1/0;for(let u=0,d=n.length;u<d;u++){let f=s[u],m,y;if(f.isOrthographic){let p=f.pixelSize;m=i.geometricError/p,y=1/0}else{let p=f.sseDenominator;y=r.distanceToPoint(f.position),m=y===0?1/0:i.geometricError/(y*p)}let g=s[u].frustum;r.intersectsFrustum(g)&&(a=!0,o=Math.max(o,m),l=Math.min(l,y)),c=Math.max(c,m),h=Math.min(h,y)}a?(e.inView=!0,e.error=o,e.distanceFromCamera=l):(e.inView=!1,e.error=c,e.distanceFromCamera=h)}dispose(){super.dispose(),this.group.removeFromParent()}};var Bf="https://tile.googleapis.com/v1/createSession",Ih=class{get isMapTilesSession(){return this.authURL===Bf}constructor(i={}){let{apiToken:e,sessionOptions:t=null,autoRefreshToken:n=!1}=i;this.apiToken=e,this.autoRefreshToken=n,this.authURL=Bf,this.sessionToken=null,this.sessionOptions=t,this._tokenRefreshPromise=null,this._authHostname=null}async fetch(i,e){this.sessionToken===null&&this.isMapTilesSession&&this.refreshToken(e),await this._tokenRefreshPromise,this._authHostname===null&&(this._authHostname=new URL(this.authURL).host);let t=new URL(i),n=t.host===this._authHostname;n&&(t.searchParams.set("key",this.apiToken),this.sessionToken&&t.searchParams.set("session",this.sessionToken));let s=await fetch(t,e);return n&&s.status>=400&&s.status<=499&&this.autoRefreshToken&&(await this.refreshToken(e),this.sessionToken&&t.searchParams.set("session",this.sessionToken),s=await fetch(t,e)),this.sessionToken===null&&!this.isMapTilesSession?s.json().then(r=>(this.sessionToken=kf(r),r)):s}refreshToken(i){if(this._tokenRefreshPromise===null){let e=new URL(this.authURL);e.searchParams.set("key",this.apiToken);let t={...i};this.isMapTilesSession&&(t.method="POST",t.body=JSON.stringify(this.sessionOptions),t.headers=t.headers||{},t.headers={...t.headers,"Content-Type":"application/json"}),this._tokenRefreshPromise=fetch(e,t).then(n=>{if(!n.ok)throw Error(`GoogleCloudAuth: Failed to load data with error code ${n.status}`);return n.json()}).then(n=>(this.sessionToken=kf(n),this._tokenRefreshPromise=null,n))}return this._tokenRefreshPromise}};function kf(i){if("session"in i)return i.session;{let e=null,t=i.root;return Fc(t,n=>{if(n.content&&n.content.uri){let[,s]=n.content.uri.split("?");return e=new URLSearchParams(s).get("session"),!0}return!1}),e}}var Hv=class{constructor(){this.creditsCount={}}_adjustAttributions(i,e){let t=this.creditsCount,n=i.split(/;/g);for(let s=0,r=n.length;s<r;s++){let a=n[s];a in t||(t[a]=0),t[a]+=e?1:-1,t[a]<=0&&delete t[a]}}addAttributions(i){this._adjustAttributions(i,!0)}removeAttributions(i){this._adjustAttributions(i,!1)}toString(){return Object.entries(this.creditsCount).sort((i,e)=>{let t=i[1];return e[1]-t}).map(i=>i[0]).join("; ")}},Gv="https://tile.googleapis.com/v1/3dtiles/root.json",Lh=class{constructor({apiToken:i,sessionOptions:e=null,autoRefreshToken:t=!1,logoUrl:n=null,useRecommendedSettings:s=!0}){this.name="GOOGLE_CLOUD_AUTH_PLUGIN",this.apiToken=i,this.useRecommendedSettings=s,this.logoUrl=n,this.auth=new Ih({apiToken:i,autoRefreshToken:t,sessionOptions:e}),this.tiles=null,this._visibilityChangeCallback=null,this._attributionsManager=new Hv,this._logoAttribution={value:"",type:"image",collapsible:!1},this._attribution={value:"",type:"string",collapsible:!0}}init(i){let{useRecommendedSettings:e,auth:t}=this;i.resetFailedTiles(),i.rootURL??=Gv,t.sessionOptions||(t.authURL=i.rootURL),e&&!t.isMapTilesSession&&(i.errorTarget=20),this.tiles=i,this._visibilityChangeCallback=({tile:n,visible:s})=>{let r=n.engineData.metadata?.asset?.copyright||"";s?this._attributionsManager.addAttributions(r):this._attributionsManager.removeAttributions(r)},i.addEventListener("tile-visibility-change",this._visibilityChangeCallback)}getAttributions(i){this.tiles.visibleTiles.size>0&&(this.logoUrl&&(this._logoAttribution.value=this.logoUrl,i.push(this._logoAttribution)),this._attribution.value=this._attributionsManager.toString(),i.push(this._attribution))}dispose(){this.tiles.removeEventListener("tile-visibility-change",this._visibilityChangeCallback)}async fetchData(i,e){return this.auth.fetch(i,e)}};var Ph=(i,e,t)=>Math.max(e,Math.min(t,i)),Wv=class{constructor(){this.duration=250,this.fadeCount=0,this._lastTick=-1,this._fadeState=new Map,this.onFadeComplete=null,this.onFadeStart=null,this.onFadeSetComplete=null,this.onFadeSetStart=null}deleteObject(i){i&&this.completeFade(i)}guaranteeState(i){let e=this._fadeState;return!e.has(i)&&(e.set(i,{fadeInTarget:0,fadeOutTarget:0,fadeIn:0,fadeOut:0}),!0)}completeFade(i){let e=this._fadeState;if(!e.has(i))return;let t=e.get(i).fadeOutTarget===0;e.delete(i),this.fadeCount--,this.onFadeComplete&&this.onFadeComplete(i,t),this.fadeCount===0&&this.onFadeSetComplete&&this.onFadeSetComplete()}completeAllFades(){this._fadeState.forEach((i,e)=>{this.completeFade(e)})}forEachObject(i){this._fadeState.forEach((e,t)=>{i(t,e)})}fadeIn(i){let e=this.guaranteeState(i),t=this._fadeState.get(i);t.fadeInTarget=1,t.fadeOutTarget=0,t.fadeOut=0,e&&(this.fadeCount++,this.fadeCount===1&&this.onFadeSetStart&&this.onFadeSetStart(),this.onFadeStart&&this.onFadeStart(i))}fadeOut(i){let e=this.guaranteeState(i),t=this._fadeState.get(i);t.fadeOutTarget=1,e&&(t.fadeInTarget=1,t.fadeIn=1,this.fadeCount++,this.fadeCount===1&&this.onFadeSetStart&&this.onFadeSetStart(),this.onFadeStart&&this.onFadeStart(i))}isFading(i){return this._fadeState.has(i)}isFadingOut(i){let e=this._fadeState.get(i);return e&&e.fadeOutTarget===1}update(){let i=globalThis.performance.now();this._lastTick===-1&&(this._lastTick=i);let e=this.duration===0?1:Ph((i-this._lastTick)/this.duration,0,1);this._lastTick=i,this._fadeState.forEach((t,n)=>{let{fadeOutTarget:s,fadeInTarget:r}=t,{fadeOut:a,fadeIn:o}=t,l=Math.sign(r-o);o=Ph(o+l*e,0,1);let c=Math.sign(s-a);a=Ph(a+c*e,0,1),t.fadeIn=o,t.fadeOut=a,(a===s&&o===r||s===1&&a>=o)&&this.completeFade(n)})}},zf=Symbol("HAS_POPPED_IN");function Xv(i){let e=i;for(;e;){if(e.traversal.wasSetActive)return e.traversal.wasInFrustum;e=e.parent}return!1}var Dh=class{get fadeDuration(){return this._fadeManager.duration}set fadeDuration(i){this._fadeManager.duration=Number(i)}get fadingTiles(){return this._fadeManager.fadeCount}constructor(i){i={maximumFadeOutTiles:50,fadeRootTiles:!1,fadeDuration:250,...i},this.name="FADE_TILES_PLUGIN",this.priority=-2,this.tiles=null,this.maximumFadeOutTiles=i.maximumFadeOutTiles,this.fadeRootTiles=i.fadeRootTiles,this._quickFadeTiles=new Set,this._fadeManager=new Wv,this._fadingOutCount=0,this._fadingBefore=0,this.fadeDuration=i.fadeDuration}init(i){this.tiles=i,this._onLoadModel=({scene:t,tile:n})=>{this.prepareTileScene(t,n)},this._onDisposeModel=({tile:t,scene:n})=>{i.visibleTiles.has(t)&&t.parent&&this._quickFadeTiles.add(t.parent),this._fadeManager.deleteObject(t),this.releaseTileScene(n,t)},this._onUpdateBefore=()=>{this._fadingBefore=this._fadeManager.fadeCount},this._onUpdateAfter=()=>this._updateAfter(),i.addEventListener("load-model",this._onLoadModel),i.addEventListener("dispose-model",this._onDisposeModel),i.addEventListener("update-before",this._onUpdateBefore),i.addEventListener("update-after",this._onUpdateAfter);let e=this._fadeManager;e.onFadeSetStart=()=>{i.dispatchEvent({type:"fade-start"}),i.dispatchEvent({type:"needs-render"})},e.onFadeSetComplete=()=>{i.dispatchEvent({type:"fade-end"}),i.dispatchEvent({type:"needs-render"})},e.onFadeComplete=(t,n)=>{this.resetFadeState(t,n),n||(i.invokeOnePlugin(s=>s!==this&&s.setTileVisible&&s.setTileVisible(t,!1)),this._fadingOutCount--)},this._forEachLoadedModel((t,n)=>this.prepareTileScene(t,n))}_updateAfter(){let i=this._fadeManager,e=this.tiles;i.update();let t=i.fadeCount;this._fadingBefore!==0&&t!==0&&(e.dispatchEvent({type:"fade-change"}),e.dispatchEvent({type:"needs-render"}));let n=this.maximumFadeOutTiles<this._fadingOutCount,s=this.updateCameraState(n);n&&s&&i.completeAllFades(),i.forEachObject((r,{fadeIn:a,fadeOut:o})=>{e.markTileUsed(r),this.setFadeState(r,a,o)})}setTileVisible(i,e){let t=this._fadeManager,n=t.isFading(i);return Xv(i)?(t.isFadingOut(i)&&this._fadingOutCount--,e?i.internal.depthFromRenderedParent===1?((i[zf]||this.fadeRootTiles)&&t.fadeIn(i),i[zf]=!0):t.fadeIn(i):(this._fadingOutCount++,t.fadeOut(i)),this._quickFadeTiles.has(i)&&(t.completeFade(i),this._quickFadeTiles.delete(i)),n?!0:!e&&t.isFading(i)):(n&&t.completeFade(i),!1)}dispose(){let i=this.tiles;this._fadeManager.completeAllFades(),i.removeEventListener("load-model",this._onLoadModel),i.removeEventListener("dispose-model",this._onDisposeModel),i.removeEventListener("update-before",this._onUpdateBefore),i.removeEventListener("update-after",this._onUpdateAfter),this._forEachLoadedModel((e,t)=>{this._fadeManager.deleteObject(t),this.releaseTileScene(e,t)}),this._fadeManager.onFadeSetStart=null,this._fadeManager.onFadeSetComplete=null,this._fadeManager.onFadeComplete=null,this._quickFadeTiles.clear(),this.tiles=null}_forEachLoadedModel(i){this.tiles.traverse(e=>{let t=e.engineData?.scene;return t&&i(t,e),!1},null,!1)}prepareTileScene(){throw Error("TilesFadePluginBase: prepareTileScene must be implemented.")}releaseTileScene(){throw Error("TilesFadePluginBase: releaseTileScene must be implemented.")}setFadeState(){throw Error("TilesFadePluginBase: setFadeState must be implemented.")}resetFadeState(){throw Error("TilesFadePluginBase: resetFadeState must be implemented.")}updateCameraState(){throw Error("TilesFadePluginBase: updateCameraState must be implemented.")}};var qv=new Xi(-1,1,1,-1,0,1),Uh=class extends _t{constructor(){super(),this.setAttribute("position",new Ft([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ft([0,2,0,0,2,0],2))}},Yv=new Uh,Ir=class{constructor(e){this._mesh=new ct(Yv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,qv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Vf=1.340264,Hf=-.081106,Gf=893e-6,Wf=.003796,Xf=Math.sqrt(3)/2;function hp(i,e,t){let n=Math.asin(Xf*Math.sin(e)),s=n*n,r=s*s*s;return t[0]=i*Math.cos(n)/(Xf*(Vf+3*Hf*s+r*(7*Gf+9*Wf*s))),t[1]=n*(Vf+Hf*s+r*(Gf+Wf*s)),t}var uS=hp(Math.PI,0,[0,0])[0],dS=hp(0,Math.PI/2,[0,0])[1];var fS=Object.freeze({fill:"#cccccc",stroke:"transparent",strokeWidth:1,radius:2,order:0,visible:!0});var qf=new Fs;qf.maxJobs=10,qf.priorityCallback=(i,e)=>{let t=i.tile,n=e.tile,s=t.internal.renderer,r=n.internal.renderer,a=s.visibleTiles.has(t);return a===r.visibleTiles.has(n)?Mr(t,n):a?1:-1};var Nh=new ce,kh=class{constructor(){this.name="UPDATE_ON_CHANGE_PLUGIN",this.tiles=null,this.needsUpdate=!1,this.cameraMatrices=new Map}init(i){this.tiles=i,this._needsUpdateCallback=()=>{this.needsUpdate=!0},this._onCameraAdd=({camera:e})=>{this.needsUpdate=!0,this.cameraMatrices.set(e,new ce)},this._onCameraDelete=({camera:e})=>{this.needsUpdate=!0,this.cameraMatrices.delete(e)},i.addEventListener("needs-update",this._needsUpdateCallback),i.addEventListener("add-camera",this._onCameraAdd),i.addEventListener("delete-camera",this._onCameraDelete),i.addEventListener("camera-resolution-change",this._needsUpdateCallback),i.cameras.forEach(e=>{this._onCameraAdd({camera:e})})}doTilesNeedUpdate(){let i=this.tiles,e=!1;this.cameraMatrices.forEach((n,s)=>{Nh.copy(i.group.matrixWorld).premultiply(s.matrixWorldInverse).premultiply(s.projectionMatrixInverse),e||=!Nh.equals(n),n.copy(Nh)});let t=this.needsUpdate;return this.needsUpdate=!1,t||e}preprocessNode(){this.needsUpdate=!0}dispose(){let i=this.tiles;i.removeEventListener("camera-resolution-change",this._needsUpdateCallback),i.removeEventListener("needs-update",this._needsUpdateCallback),i.removeEventListener("add-camera",this._onCameraAdd),i.removeEventListener("delete-camera",this._onCameraDelete)}};function wt(i,e,t){return i&&e in i?i[e]:t}function up(i){return i!=="BOOLEAN"&&i!=="STRING"&&i!=="ENUM"}function $v(i){return/^FLOAT/.test(i)}function Nr(i){return/^VEC/.test(i)}function Or(i){return/^MAT/.test(i)}function dp(i,e,t,n=null){return Or(t)||Nr(t)?n.fromArray(i,e):i[e]}function Fh(i){let{type:e,componentType:t}=i;switch(e){case"SCALAR":return t==="INT64"?0n:0;case"VEC2":return new ve;case"VEC3":return new C;case"VEC4":return new qe;case"MAT2":return new qa;case"MAT3":return new Pe;case"MAT4":return new ce;case"BOOLEAN":return!1;case"STRING":return"";case"ENUM":return 0}}function Yf(i,e){if(e==null)return!1;switch(i){case"SCALAR":return typeof e=="number"||typeof e=="bigint";case"VEC2":return e.isVector2;case"VEC3":return e.isVector3;case"VEC4":return e.isVector4;case"MAT2":return e.isMatrix2;case"MAT3":return e.isMatrix3;case"MAT4":return e.isMatrix4;case"BOOLEAN":return typeof e=="boolean";case"STRING":return typeof e=="string";case"ENUM":return typeof e=="number"||typeof e=="bigint"}throw Error("ClassProperty: invalid type.")}function Ur(i,e=null){switch(i){case"INT8":return Int8Array;case"INT16":return Int16Array;case"INT32":return Int32Array;case"INT64":return BigInt64Array;case"UINT8":return Uint8Array;case"UINT16":return Uint16Array;case"UINT32":return Uint32Array;case"UINT64":return BigUint64Array;case"FLOAT32":return Float32Array;case"FLOAT64":return Float64Array}switch(e){case"BOOLEAN":return Uint8Array;case"STRING":return Uint8Array}throw Error("ClassProperty: invalid type.")}function Jv(i,e=null){if(i.array){e=e&&Array.isArray(e)?e:[],e.length=i.count;for(let t=0,n=e.length;t<n;t++)e[t]=vo(i,e[t])}else e=vo(i,e);return e}function vo(i,e=null){let t=i.default,n=i.type;if(e||=Fh(i),t===null){switch(n){case"SCALAR":return 0;case"VEC2":return e.set(0,0);case"VEC3":return e.set(0,0,0);case"VEC4":return e.set(0,0,0,0);case"MAT2":return e.identity();case"MAT3":return e.identity();case"MAT4":return e.identity();case"BOOLEAN":return!1;case"STRING":return"";case"ENUM":return""}throw Error("ClassProperty: invalid type.")}if(Or(n))e.fromArray(t);else if(Nr(n))e.fromArray(t);else return t}function Kv(i,e){if(i.noData===null)return e;let t=i.noData,n=i.type;if(Array.isArray(e))for(let a=0,o=e.length;a<o;a++)e[a]=s(e[a]);else e=s(e);return e;function s(a){return r(a)&&(a=vo(i,a)),a}function r(a){if(Or(n)){let o=a.elements;for(let l=0,c=t.length;l<c;l++)if(t[l]!==o[l])return!1;return!0}if(Nr(n)){for(let o=0,l=t.length;o<l;o++)if(t[o]!==a.getComponent(o))return!1;return!0}return t===a}}function Qv(i,e){switch(i){case"INT8":return Math.max(e/127,-1);case"INT16":return Math.max(e,32767,-1);case"INT32":return Math.max(e/2147483647,-1);case"INT64":return Math.max(Number(e)/9223372036854776e3,-1);case"UINT8":return e/255;case"UINT16":return e/65535;case"UINT32":return e/4294967295;case"UINT64":return Number(e)/18446744073709552e3}}function eb(i,e){let{type:t,componentType:n,scale:s,offset:r,normalized:a}=i;if(Array.isArray(e))for(let u=0,d=e.length;u<d;u++)e[u]=o(e[u]);else e=o(e);return e;function o(u){return u=Or(t)?c(u):Nr(t)?l(u):h(u),u}function l(u){return u.x=h(u.x),u.y=h(u.y),"z"in u&&(u.z=h(u.z)),"w"in u&&(u.w=h(u.w)),u}function c(u){let d=u.elements;for(let f=0,m=d.length;f<m;f++)d[f]=h(d[f]);return u}function h(u){return a&&(u=Qv(n,u)),(a||$v(n))&&(u=u*s+r),u}}function zh(i,e,t=null){if(i.array){Array.isArray(e)||(e=Array(i.count||0)),e.length=t===null?i.count:t;for(let n=0,s=e.length;n<s;n++)Yf(i.type,e[n])||(e[n]=Fh(i))}else Yf(i.type,e)||(e=Fh(i));return e}function bo(i,e){for(let t in e)t in i||delete e[t];for(let t in i){let n=i[t];e[t]=zh(n,e[t])}}function tb(i){switch(i){case"ENUM":return 1;case"SCALAR":return 1;case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"MAT2":return 4;case"MAT3":return 9;case"MAT4":return 16;case"BOOLEAN":return-1;case"STRING":return-1;default:return-1}}var So=class{constructor(i,e,t=null){this.name=e.name||null,this.description=e.description||null,this.type=e.type,this.componentType=e.componentType||null,this.enumType=e.enumType||null,this.array=e.array||!1,this.count=e.count||0,this.normalized=e.normalized||!1,this.offset=e.offset||0,this.scale=wt(e,"scale",1),this.max=wt(e,"max",1/0),this.min=wt(e,"min",-1/0),this.required=e.required||!1,this.noData=wt(e,"noData",null),this.default=wt(e,"default",null),this.semantic=wt(e,"semantic",null),this.enumSet=null,this.accessorProperty=t,t&&(this.offset=wt(t,"offset",this.offset),this.scale=wt(t,"scale",this.scale),this.max=wt(t,"max",this.max),this.min=wt(t,"min",this.min)),e.type==="ENUM"&&(this.enumSet=i[this.enumType],this.componentType===null&&(this.componentType=wt(this.enumSet,"valueType","UINT16")))}shapeToProperty(i,e=null){return zh(this,i,e)}resolveDefaultElement(i){return vo(this,i)}resolveDefault(i){return Jv(this,i)}resolveNoData(i){return Kv(this,i)}resolveEnumsToStrings(i){let e=this.enumSet;if(this.type==="ENUM")if(Array.isArray(i))for(let n=0,s=i.length;n<s;n++)i[n]=t(i[n]);else i=t(i);return i;function t(n){let s=e.values.find(r=>r.value===n);return s===null?"":s.name}}adjustValueScaleOffset(i){return up(this.type)?eb(this,i):i}},Vh=class{constructor(i,e={},t={},n=null){this.definition=i,this.class=e[i.class],this.className=i.class,this.enums=t,this.data=n,this.name="name"in i?i.name:null,this.properties=null}getPropertyNames(){return Object.keys(this.class.properties)}includesData(i){return!!this.definition.properties[i]}dispose(){}_initProperties(i=So){let e={};for(let t in this.class.properties)e[t]=new i(this.enums,this.class.properties[t],this.definition.properties[t]);this.properties=e}},ib=class extends So{constructor(i,e,t=null){super(i,e,t),this.attribute=t?.attribute??null}},nb=class extends Vh{constructor(...i){super(...i),this.isPropertyAttributeAccessor=!0,this._initProperties(ib)}getData(i,e,t={}){let n=this.properties;bo(n,t);for(let s in n)t[s]=this.getPropertyValue(s,i,e,t[s]);return t}getPropertyValue(i,e,t,n=null){if(e>=this.count)throw Error("PropertyAttributeAccessor: Requested index is outside the range of the buffer.");let s=this.properties[i],r=s.type;if(!s)throw Error("PropertyAttributeAccessor: Requested class property does not exist.");if(!this.definition.properties[i])return s.resolveDefault(n);n=s.shapeToProperty(n);let a=t.getAttribute(s.attribute.toLowerCase());if(Or(r)){let o=n.elements;for(let l=o.length;0<l;)o[0]=a.getComponent(e,0)}else if(Nr(r))n.fromBufferAttribute(a,e);else if(r==="SCALAR"||r==="ENUM")n=a.getX(e);else throw Error("StructuredMetadata.PropertyAttributeAccessor: BOOLEAN and STRING types are not supported by property attributes.");return n=s.adjustValueScaleOffset(n),n=s.resolveEnumsToStrings(n),n=s.resolveNoData(n),n}},sb=class extends So{constructor(i,e,t=null){super(i,e,t),this.values=t?.values??null,this.valueLength=tb(this.type),this.arrayOffsets=wt(t,"arrayOffsets",null),this.stringOffsets=wt(t,"stringOffsets",null),this.arrayOffsetType=wt(t,"arrayOffsetType","UINT32"),this.stringOffsetType=wt(t,"stringOffsetType","UINT32")}getArrayLengthFromId(i,e){let t=this.count;if(this.arrayOffsets!==null){let{arrayOffsets:n,arrayOffsetType:s}=this,r=new(Ur(s))(i[n]);t=r[e+1]-r[e]}return t}getIndexOffsetFromId(i,e){let t=e;if(this.arrayOffsets){let{arrayOffsets:n,arrayOffsetType:s}=this;t=new(Ur(s))(i[n])[t]}else this.array&&(t*=this.count);return t}},rb=class extends Vh{constructor(...i){super(...i),this.isPropertyTableAccessor=!0,this.count=this.definition.count,this._initProperties(sb)}getData(i,e={}){let t=this.properties;bo(t,e);for(let n in t)e[n]=this.getPropertyValue(n,i,e[n]);return e}_readValueAtIndex(i,e,t,n=null){let s=this.properties[i],{componentType:r,type:a}=s,o=this.data,l=o[s.values],c=new(Ur(r,a))(l),h=s.getIndexOffsetFromId(o,e);if(up(a)||a==="ENUM")return dp(c,(h+t)*s.valueLength,a,n);if(a==="STRING"){let u=h+t,d=0;if(s.stringOffsets!==null){let{stringOffsets:m,stringOffsetType:y}=s,g=new(Ur(y))(o[m]);d=g[u+1]-g[u],u=g[u]}let f=new Uint8Array(c.buffer,u,d);n=new TextDecoder().decode(f)}else if(a==="BOOLEAN"){let u=h+t,d=Math.floor(u/8),f=u%8;n=(c[d]>>f&1)==1}return n}getPropertyValue(i,e,t=null){if(e>=this.count)throw Error("PropertyTableAccessor: Requested index is outside the range of the table.");let n=this.properties[i];if(!n)throw Error("PropertyTableAccessor: Requested property does not exist.");if(!this.definition.properties[i])return n.resolveDefault(t);let s=n.array,r=this.data,a=n.getArrayLengthFromId(r,e);if(t=n.shapeToProperty(t,a),s)for(let o=0,l=t.length;o<l;o++)t[o]=this._readValueAtIndex(i,e,o,t[o]);else t=this._readValueAtIndex(i,e,0,t);return t=n.adjustValueScaleOffset(t),t=n.resolveEnumsToStrings(t),t=n.resolveNoData(t),t}},Lr=new Ya,jf=class{constructor(){this._renderer=new Cs,this._target=new ri(1,1),this._texTarget=new ri,this._quad=new Ir(new Jt({blending:vc,blendDst:bc,blendSrc:Mc,uniforms:{map:{value:null},pixel:{value:new ve}},vertexShader:`
				void main() {

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform ivec2 pixel;

				void main() {

					gl_FragColor = texelFetch( map, pixel, 0 );

				}
			`}))}increaseSizeTo(i){this._target.setSize(Math.max(this._target.width,i),1)}readDataAsync(i){let{_renderer:e,_target:t}=this;return e.readRenderTargetPixelsAsync(t,0,0,i.length/4,1,i)}readData(i){let{_renderer:e,_target:t}=this;e.readRenderTargetPixels(t,0,0,i.length/4,1,i)}renderPixelToTarget(i,e,t){let{_renderer:n,_target:s}=this;Lr.min.copy(e),Lr.max.copy(e),Lr.max.x+=1,Lr.max.y+=1,n.initRenderTarget(s),n.copyTextureToTexture(i,s.texture,Lr,t,0)}},Pn=new class{constructor(){let i=null;Object.getOwnPropertyNames(jf.prototype).forEach(e=>{e!=="constructor"&&(this[e]=(...t)=>(i||=new jf,i[e](...t)))})}},Zf=new ve,$f=new ve,Jf=new ve;function ab(i,e){return e===0?i.getAttribute("uv"):i.getAttribute(`uv${e}`)}function fp(i,e,t=[,,,]){let n=3*e,s=3*e+1,r=3*e+2;return i.index&&(n=i.index.getX(n),s=i.index.getX(s),r=i.index.getX(r)),t[0]=n,t[1]=s,t[2]=r,t}function pp(i,e,t,n,s){let[r,a,o]=n,l=ab(i,e);Zf.fromBufferAttribute(l,r),$f.fromBufferAttribute(l,a),Jf.fromBufferAttribute(l,o),s.set(0,0,0).addScaledVector(Zf,t.x).addScaledVector($f,t.y).addScaledVector(Jf,t.z)}function mp(i,e,t,n){let s=i.x-Math.floor(i.x),r=i.y-Math.floor(i.y),a=Math.floor(s*e%e),o=Math.floor(r*t%t);return n.set(a,o),n}var Kf=new ve,Qf=new ve,ep=new ve,ob=class extends So{constructor(i,e,t=null){super(i,e,t),this.channels=wt(t,"channels",[0]),this.index=wt(t,"index",null),this.texCoord=wt(t,"texCoord",null),this.valueLength=parseInt(this.type.replace(/[^0-9]/g,""))||1}readDataFromBuffer(i,e,t=null){let n=this.type;if(n==="BOOLEAN"||n==="STRING")throw Error("PropertyTextureAccessor: BOOLEAN and STRING types not supported.");return dp(i,e*this.valueLength,n,t)}},lb=class extends Vh{constructor(...i){super(...i),this.isPropertyTextureAccessor=!0,this._asyncRead=!1,this._initProperties(ob)}getData(i,e,t,n={}){let s=this.properties;bo(s,n);let r=Object.keys(s),a=r.map(o=>n[o]);return this.getPropertyValuesAtTexel(r,i,e,t,a),r.forEach((o,l)=>n[o]=a[l]),n}async getDataAsync(i,e,t,n={}){let s=this.properties;bo(s,n);let r=Object.keys(s),a=r.map(o=>n[o]);return await this.getPropertyValuesAtTexelAsync(r,i,e,t,a),r.forEach((o,l)=>n[o]=a[l]),n}getPropertyValuesAtTexelAsync(...i){this._asyncRead=!0;let e=this.getPropertyValuesAtTexel(...i);return this._asyncRead=!1,e}getPropertyValuesAtTexel(i,e,t,n,s=[]){for(;s.length<i.length;)s.push(null);s.length=i.length,Pn.increaseSizeTo(s.length);let r=this.data,a=this.definition.properties,o=this.properties,l=fp(n,e);for(let u=0,d=i.length;u<d;u++){let f=i[u];if(!a[f])continue;let m=o[f],y=r[m.index];pp(n,m.texCoord,t,l,Kf),mp(Kf,y.image.width,y.image.height,Qf),ep.set(u,0),Pn.renderPixelToTarget(y,Qf,ep)}let c=new Uint8Array(i.length*4);return this._asyncRead?Pn.readDataAsync(c).then(()=>(h.call(this),s)):(Pn.readData(c),h.call(this),s);function h(){for(let u=0,d=i.length;u<d;u++){let f=i[u],m=o[f],y=m.type;if(s[u]=zh(m,s[u]),!m)throw Error("PropertyTextureAccessor: Requested property does not exist.");if(!a[f]){s[u]=m.resolveDefault(s);continue}let g=m.valueLength*(m.count||1),p=m.channels.map(v=>c[4*u+v]),T=m.componentType,x=new(Ur(T,y))(g);if(new Uint8Array(x.buffer).set(p),m.array){let v=s[u];for(let P=0,E=v.length;P<E;P++)v[P]=m.readDataFromBuffer(x,P,v[P])}else s[u]=m.readDataFromBuffer(x,0,s[u]);s[u]=m.adjustValueScaleOffset(s[u]),s[u]=m.resolveEnumsToStrings(s[u]),s[u]=m.resolveNoData(s[u])}}}dispose(){this.data.forEach(i=>{i&&(i.dispose(),i.image instanceof ImageBitmap&&i.image.close())})}},Bh=class{constructor(i,e,t,n=null,s=null){let{schema:r,propertyTables:a=[],propertyTextures:o=[],propertyAttributes:l=[]}=i,{enums:c,classes:h}=r,u=a.map(m=>new rb(m,h,c,t)),d=[],f=[];n&&(n.propertyTextures&&(d=n.propertyTextures.map(m=>new lb(o[m],h,c,e))),n.propertyAttributes&&(f=n.propertyAttributes.map(m=>new nb(l[m],h,c)))),this.schema=r,this.tableAccessors=u,this.textureAccessors=d,this.attributeAccessors=f,this.object=s,this.textures=e,this.nodeMetadata=n}getPropertyTableData(i,e,t=null){if(!Array.isArray(i))t||={},t=this.tableAccessors[i].getData(e,t);else{t||=[];let n=Math.min(i.length,e.length);t.length=n;for(let s=0;s<n;s++){let r=this.tableAccessors[i[s]];t[s]=r.getData(e[s],t[s])}}if(Array.isArray(i)!==Array.isArray(t)||Array.isArray(i)!==Array.isArray(e))throw Error("StructuralMetadata: Scalar and array inputs cannot be mixed.");return t}getPropertyTableInfo(i=null){if(i===null&&(i=this.tableAccessors.map((e,t)=>t)),Array.isArray(i))return i.map(e=>{let t=this.tableAccessors[e];return{name:t.name,className:t.definition.class}});{let e=this.tableAccessors[i];return{name:e.name,className:e.definition.class}}}getPropertyTextureData(i,e,t=[]){let n=this.textureAccessors;t.length=n.length;for(let s=0;s<n.length;s++){let r=n[s];t[s]=r.getData(i,e,this.object.geometry,t[s])}return t}async getPropertyTextureDataAsync(i,e,t=[]){let n=this.textureAccessors;t.length=n.length;let s=[];for(let r=0;r<n.length;r++){let a=n[r].getDataAsync(i,e,this.object.geometry,t[r]).then(o=>{t[r]=o});s.push(a)}return await Promise.all(s),t}getPropertyTextureInfo(){return this.textureAccessors}getPropertyAttributeData(i,e=[]){let t=this.attributeAccessors;e.length=t.length;for(let n=0;n<t.length;n++){let s=t[n];e[n]=s.getData(i,this.object.geometry,e[n])}return e}getPropertyAttributeInfo(){return this.attributeAccessors.map(i=>({name:i.name,className:i.definition.class}))}dispose(){this.textureAccessors.forEach(i=>i.dispose()),this.tableAccessors.forEach(i=>i.dispose()),this.attributeAccessors.forEach(i=>i.dispose())}},Dr="EXT_structural_metadata";function cb(i,e=[]){let t=i.json.textures?.length||0,n=Array(t).fill(null);return e.forEach(({properties:s})=>{for(let r in s){let{index:a}=s[r];n[a]===null&&(n[a]=i.loadTexture(a))}}),Promise.all(n)}function hb(i,e=[]){let t=i.json.bufferViews?.length||0,n=Array(t).fill(null);return e.forEach(({properties:s})=>{for(let r in s){let{values:a,arrayOffsets:o,stringOffsets:l}=s[r];n[a]===null&&(n[a]=i.getDependency("bufferView",a)),n[o]===null&&(n[o]=i.getDependency("bufferView",o)),n[l]===null&&(n[l]=i.getDependency("bufferView",l))}}),Promise.all(n)}var gp=class{constructor(i){this.parser=i,this.name=Dr}async afterRoot({scene:i,parser:e}){let t=e.json.extensionsUsed;if(!t||!t.includes(Dr))return;let n=null,s=e.json.extensions[Dr];if(s.schemaUri){let{manager:l,path:c,requestHeader:h,crossOrigin:u}=e.options,d=new URL(s.schemaUri,c).toString(),f=new Ci(l);f.setCrossOrigin(u),f.setResponseType("json"),f.setRequestHeader(h),n=f.loadAsync(d).then(m=>{s={...s,schema:m}})}let[r,a]=await Promise.all([cb(e,s.propertyTextures),hb(e,s.propertyTables),n]),o=new Bh(s,r,a);i.userData.structuralMetadata=o,i.traverse(l=>{if(e.associations.has(l)){let{meshes:c,primitives:h}=e.associations.get(l),u=e.json.meshes[c]?.primitives[h];if(u&&u.extensions&&u.extensions[Dr]){let d=u.extensions[Dr];l.userData.structuralMetadata=new Bh(s,r,a,d,l)}else l.userData.structuralMetadata=o}})}},tp=new ve,ip=new ve,np=new ve;function ub(i){return i.x>i.y&&i.x>i.z?0:i.y>i.z?1:2}var yp=class{constructor(i,e,t){this.geometry=i,this.textures=e,this.data=t,this._asyncRead=!1,this.featureIds=t.featureIds.map(n=>{let{texture:s,...r}=n,a={label:null,propertyTable:null,nullFeatureId:null,...r};return s&&(a.texture={texCoord:0,channels:[0],...s}),a})}getTextures(){return this.textures}getFeatureInfo(){return this.featureIds}getFeaturesAsync(...i){this._asyncRead=!0;let e=this.getFeatures(...i);return this._asyncRead=!1,e}getFeatures(i,e){let{geometry:t,textures:n,featureIds:s}=this,r=Array(s.length).fill(null),a=s.length;Pn.increaseSizeTo(a);let o=fp(t,i),l=o[ub(e)];for(let u=0,d=s.length;u<d;u++){let f=s[u],m="nullFeatureId"in f?f.nullFeatureId:null;if("texture"in f){let y=n[f.texture.index];pp(t,f.texture.texCoord,e,o,tp),mp(tp,y.image.width,y.image.height,ip),np.set(u,0),Pn.renderPixelToTarget(n[f.texture.index],ip,np)}else if("attribute"in f){let y=t.getAttribute(`_feature_id_${f.attribute}`).getX(l);y!==m&&(r[u]=y)}else{let y=l;y!==m&&(r[u]=y)}}let c=new Uint8Array(a*4);return this._asyncRead?Pn.readDataAsync(c).then(()=>(h(),r)):(Pn.readData(c),h(),r);function h(){let u=new Uint32Array(1);for(let d=0,f=s.length;d<f;d++){let m=s[d],y="nullFeatureId"in m?m.nullFeatureId:null;if("texture"in m){let{channels:g}=m.texture,p=g.map(x=>c[4*d+x]);new Uint8Array(u.buffer).set(p);let T=u[0];T!==y&&(r[d]=T)}}}}dispose(){this.textures.forEach(i=>{i&&(i.dispose(),i.image instanceof ImageBitmap&&i.image.close())})}},Mo="EXT_mesh_features";function sp(i,e,t){i.traverse(n=>{if(e.associations.has(n)){let{meshes:s,primitives:r}=e.associations.get(n),a=e.json.meshes[s]?.primitives[r];a&&a.extensions&&a.extensions[Mo]&&t(n,a.extensions[Mo])}})}var _p=class{constructor(i){this.parser=i,this.name=Mo}async afterRoot({scene:i,parser:e}){let t=e.json.extensionsUsed;if(!t||!t.includes(Mo))return;let n=e.json.textures?.length||0,s=Array(n).fill(null);sp(i,e,(a,{featureIds:o})=>{o.forEach(l=>{if(l.texture&&s[l.texture.index]===null){let c=l.texture.index;s[c]=e.loadTexture(c)}})});let r=await Promise.all(s);sp(i,e,(a,o)=>{a.userData.meshFeatures=new yp(a.geometry,r,o)})}},xp=class{constructor(){this.name="CESIUM_RTC"}afterRoot(i){if(i.parser.json.extensions&&i.parser.json.extensions.CESIUM_RTC){let{center:e}=i.parser.json.extensions.CESIUM_RTC;e&&(i.scene.position.x+=e[0],i.scene.position.y+=e[1],i.scene.position.z+=e[2])}}},Hh=class{constructor(i){i={metadata:!0,rtc:!0,plugins:[],dracoLoader:null,ktxLoader:null,meshoptDecoder:null,autoDispose:!0,...i},this.tiles=null,this.metadata=i.metadata,this.rtc=i.rtc,this.plugins=i.plugins,this.dracoLoader=i.dracoLoader,this.ktxLoader=i.ktxLoader,this.meshoptDecoder=i.meshoptDecoder,this._gltfRegex=/\.(gltf|glb)$/g,this._dracoRegex=/\.drc$/g,this._loader=null}init(i){let e=new En(i.manager);this.dracoLoader&&(e.setDRACOLoader(this.dracoLoader),i.manager.addHandler(this._dracoRegex,this.dracoLoader)),this.ktxLoader&&e.setKTX2Loader(this.ktxLoader),this.meshoptDecoder&&e.setMeshoptDecoder(this.meshoptDecoder),this.rtc&&e.register(()=>new xp),this.metadata&&(e.register(()=>new gp),e.register(()=>new _p)),this.plugins.forEach(t=>e.register(t)),i.manager.addHandler(this._gltfRegex,e),this.tiles=i,this._loader=e}dispose(){this.tiles.manager.removeHandler(this._gltfRegex),this.tiles.manager.removeHandler(this._dracoRegex),this.autoDispose&&(this.ktxLoader.dispose(),this.dracoLoader.dispose())}},xo=new St,Gh=class{constructor(i){i={up:"+z",recenter:!0,lat:null,lon:null,height:0,azimuth:0,elevation:0,roll:0,...i},this.tiles=null,this.up=i.up.toLowerCase().replace(/\s+/,""),this.lat=i.lat,this.lon=i.lon,this.height=i.height,this.azimuth=i.azimuth,this.elevation=i.elevation,this.roll=i.roll,this.recenter=i.recenter,this._callback=null}init(i){this.tiles=i,this._callback=()=>{let{up:e,lat:t,lon:n,height:s,azimuth:r,elevation:a,roll:o,recenter:l}=this;if(t!==null&&n!==null)this.transformLatLonHeightToOrigin(t,n,s,r,a,o);else{let{ellipsoid:c}=i,h=Math.min(...c.radius);if(i.getBoundingSphere(xo),xo.center.length()>h*.5){let u={};c.getPositionToCartographic(xo.center,u),this.transformLatLonHeightToOrigin(u.lat,u.lon,u.height)}else{let u=i.group;switch(u.rotation.set(0,0,0),e){case"x":case"+x":u.rotation.z=Math.PI/2;break;case"-x":u.rotation.z=-Math.PI/2;break;case"y":case"+y":break;case"-y":u.rotation.z=Math.PI;break;case"z":case"+z":u.rotation.x=-Math.PI/2;break;case"-z":u.rotation.x=Math.PI/2}i.group.position.copy(xo.center).applyEuler(u.rotation).multiplyScalar(-1)}}l||i.group.position.setScalar(0),i.removeEventListener("load-root-tileset",this._callback)},i.addEventListener("load-root-tileset",this._callback),i.root&&this._callback()}transformLatLonHeightToOrigin(i,e,t=0,n=0,s=0,r=0){let{group:a,ellipsoid:o}=this.tiles;o.getObjectFrame(i,e,t,n,s,r,a.matrix,2),a.matrix.invert().decompose(a.position,a.quaternion,a.scale),a.updateMatrixWorld()}dispose(){let{group:i}=this.tiles;i.position.setScalar(0),i.quaternion.identity(),i.scale.set(1,1,1),this.tiles.removeEventListener("load-root-tileset",this._callback)}};var Oh=Symbol("FADE_PARAMS");function vp(i,e){if(i[Oh])return i[Oh];let t={fadeIn:{value:0},fadeOut:{value:0},fadeTexture:{value:null}};return i[Oh]=t,i.defines={...i.defines||{},FEATURE_FADE:0},i.onBeforeCompile=n=>{e&&e(n),n.uniforms={...n.uniforms,...t},n.vertexShader=n.vertexShader.replace(/void\s+main\(\)\s+{/,s=>`
					#ifdef USE_BATCHING_FRAG

					varying float vBatchId;

					#endif

					${s}

						#ifdef USE_BATCHING_FRAG

						// add 0.5 to the value to avoid floating error that may cause flickering
						vBatchId = getIndirectIndex( gl_DrawID ) + 0.5;

						#endif
				`),n.fragmentShader=n.fragmentShader.replace(/void main\(/,s=>`
				#if FEATURE_FADE

				// adapted from https://www.shadertoy.com/view/Mlt3z8
				float bayerDither2x2( vec2 v ) {

					return mod( 3.0 * v.y + 2.0 * v.x, 4.0 );

				}

				float bayerDither4x4( vec2 v ) {

					vec2 P1 = mod( v, 2.0 );
					vec2 P2 = floor( 0.5 * mod( v, 4.0 ) );
					return 4.0 * bayerDither2x2( P1 ) + bayerDither2x2( P2 );

				}

				// the USE_BATCHING define is not available in fragment shaders
				#ifdef USE_BATCHING_FRAG

				// functions for reading the fade state of a given batch id
				uniform sampler2D fadeTexture;
				varying float vBatchId;
				vec2 getFadeValues( const in float i ) {

					int size = textureSize( fadeTexture, 0 ).x;
					int j = int( i );
					int x = j % size;
					int y = j / size;
					return texelFetch( fadeTexture, ivec2( x, y ), 0 ).rg;

				}

				#else

				uniform float fadeIn;
				uniform float fadeOut;

				#endif

				#endif

				${s}
			`).replace(/#include <dithering_fragment>/,s=>`

				${s}

				#if FEATURE_FADE

				#ifdef USE_BATCHING_FRAG

				vec2 fadeValues = getFadeValues( vBatchId );
				float fadeIn = fadeValues.r;
				float fadeOut = fadeValues.g;

				#endif

				float bayerValue = bayerDither4x4( floor( mod( gl_FragCoord.xy, 4.0 ) ) );
				float bayerBins = 16.0;
				float dither = ( 0.5 + bayerValue ) / bayerBins;
				if ( dither >= fadeIn ) {

					discard;

				}

				if ( dither < fadeOut ) {

					discard;

				}

				#endif

			`)},t}var db=class{constructor(){this._fadeParams=new WeakMap,this.fading=0}setFade(i,e,t){if(!i)return;let n=this._fadeParams;i.traverse(s=>{let r=s.material;if(r&&n.has(r)){let a=n.get(r);a.fadeIn.value=e,a.fadeOut.value=t;let o=+(e!==0&&e!==1||t!==0&&t!==1);r.defines.FEATURE_FADE!==o&&(this.fading+=o===1?1:-1,r.defines.FEATURE_FADE=o,r.needsUpdate=!0)}})}prepareScene(i){i.traverse(e=>{e.material&&this.prepareMaterial(e.material)})}deleteScene(i){if(!i)return;this.setFade(i,1,0);let e=this._fadeParams;i.traverse(t=>{let n=t.material;n&&e.delete(n)})}prepareMaterial(i){let e=this._fadeParams;e.has(i)||e.set(i,vp(i,i.onBeforeCompile))}},fb=class{constructor(i,e=new $t){this.other=i,this.material=e,this.visible=!0,this.parent=null,this._instanceInfo=[],this._visibilityChanged=!0;let t=new Proxy(this,{get(n,s){if(s in n)return n[s];{let r=i[s];return r instanceof Function?(...a)=>(n.syncInstances(),r.call(t,...a)):i[s]}},set(n,s,r){return s in n?n[s]=r:i[s]=r,!0},deleteProperty(n,s){return s in n?delete n[s]:delete i[s]}});return t}syncInstances(){let i=this._instanceInfo,e=this.other._instanceInfo;for(;e.length>i.length;){let t=i.length;i.push(new Proxy({visible:!1},{get(n,s){return s in n?n[s]:e[t][s]},set(n,s,r){return s in n?n[s]=r:e[t][s]=r,!0}}))}}},pb=class extends fb{constructor(...i){super(...i);let e=this.material,t=vp(e,e.onBeforeCompile);e.defines.FEATURE_FADE=1,e.defines.USE_BATCHING_FRAG=1,e.needsUpdate=!0,this.fadeTexture=null,this._fadeParams=t}setFadeAt(i,e,t){this._initFadeTexture(),this.fadeTexture.setValueAt(i,e*255,t*255)}_initFadeTexture(){let i=Math.sqrt(this._maxInstanceCount);i=Math.ceil(i);let e=i*i*2,t=this.fadeTexture;if(!t||t.image.data.length!==e){let n=new mb(new Uint8Array(e),i,i,$a,xi);if(t){t.dispose();let s=t.image.data,r=this.fadeTexture.image.data,a=Math.min(s.length,r.length);r.set(new s.constructor(s.buffer,0,a))}this.fadeTexture=n,this._fadeParams.fadeTexture.value=n,n.needsUpdate=!0}}dispose(){this.fadeTexture&&this.fadeTexture.dispose()}},mb=class extends Wn{setValueAt(i,...e){let{data:t,width:n,height:s}=this.image,r=Math.floor(t.length/(n*s)),a=!1;for(let o=0;o<r;o++){let l=i*r+o,c=t[l],h=e[o]||0;c!==h&&(t[l]=h,a=!0)}a&&(this.needsUpdate=!0)}},rp=new C,ap=new C,op=new Rt,lp=new Rt,cp=new C,Wh=class extends Dh{constructor(i){super(i),this.batchedMesh=null,this._fadeMaterialManager=new db,this._prevCameraTransforms=null}init(i){this._prevCameraTransforms=new Map,i.cameras.forEach(e=>{this._prevCameraTransforms.set(e,new ce)}),super.init(i),this._onAddCamera=({camera:e})=>{this._prevCameraTransforms.set(e,new ce)},this._onDeleteCamera=({camera:e})=>{this._prevCameraTransforms.delete(e)},this._onTileVisibilityChange=({tile:e})=>{this.forEachBatchIds(e,(t,n,s)=>{n.setFadeAt(t,0,0),n.setVisibleAt(t,!1),s.batchedMesh.setVisibleAt(t,!1)})},i.addEventListener("add-camera",this._onAddCamera),i.addEventListener("delete-camera",this._onDeleteCamera),i.addEventListener("tile-visibility-change",this._onTileVisibilityChange)}prepareTileScene(i){this._fadeMaterialManager.prepareScene(i)}releaseTileScene(i){this._fadeMaterialManager.deleteScene(i)}setFadeState(i,e,t){let n=i.engineData?.scene;n&&this._fadeMaterialManager.setFade(n,e,t),this.forEachBatchIds(i,(s,r,a)=>{r.setFadeAt(s,e,t),r.setVisibleAt(s,!0),a.batchedMesh.setVisibleAt(s,!1)})}resetFadeState(i,e){this._fadeMaterialManager.setFade(i.engineData?.scene,0,0),this.forEachBatchIds(i,(t,n,s)=>{n.setFadeAt(t,0,0),n.setVisibleAt(t,!1),s.batchedMesh.setVisibleAt(t,e)})}updateCameraState(i){let{cameras:e}=this.tiles,t=this._prevCameraTransforms,n=!0;return i&&e.forEach(s=>{if(!t.has(s))return;let r=s.matrixWorld,a=t.get(s);r.decompose(ap,lp,cp),a.decompose(rp,op,cp),n&&=lp.angleTo(op)>.25||ap.distanceTo(rp)>.1}),e.forEach(s=>{t.get(s).copy(s.matrixWorld)}),n}_updateAfter(){if(super._updateAfter(),this.batchedMesh){let i=this.tiles.getPluginByName("BATCHED_TILES_PLUGIN").batchedMesh.material;this.batchedMesh.material.map=i.map}}initBatchedMesh(){let i=this.tiles.getPluginByName("BATCHED_TILES_PLUGIN")?.batchedMesh;if(i){if(this.batchedMesh===null){this._onBatchedMeshDispose=()=>{this.batchedMesh.dispose(),this.batchedMesh.removeFromParent(),this.batchedMesh=null,i.removeEventListener("dispose",this._onBatchedMeshDispose)};let e=i.material.clone();e.onBeforeCompile=i.material.onBeforeCompile,this.batchedMesh=new pb(i,e),this.tiles.group.add(this.batchedMesh)}}else this.batchedMesh!==null&&(this._onBatchedMeshDispose(),this._onBatchedMeshDispose=null)}dispose(){let i=this.tiles;super.dispose(),this.batchedMesh!==null&&this._onBatchedMeshDispose(),i.removeEventListener("add-camera",this._onAddCamera),i.removeEventListener("delete-camera",this._onDeleteCamera),i.removeEventListener("tile-visibility-change",this._onTileVisibilityChange),this._prevCameraTransforms=null}forEachBatchIds(i,e){if(this.initBatchedMesh(),this.batchedMesh){let t=this.tiles.getPluginByName("BATCHED_TILES_PLUGIN"),n=t.getTileBatchIds(i);n&&n.forEach(s=>e(s,this.batchedMesh,t))}}};var pS=new Ir(new $t),gb=new Wn(new Uint8Array([255,255,255,255]),1,1);gb.needsUpdate=!0;var yb=0,_b=1,xb=2,vb=3,bb=4,Mb=5,Sb=6,Tb=7,wb=8,Eb=9,Ab=10,Cb=11,mS=Object.freeze({NONE:yb,SCREEN_ERROR:_b,GEOMETRIC_ERROR:xb,DISTANCE:vb,DEPTH:bb,RELATIVE_DEPTH:Mb,IS_LEAF:Sb,RANDOM_COLOR:Tb,RANDOM_NODE_COLOR:wb,CUSTOM_COLOR:Eb,LOAD_ORDER:Ab,INDEXED_COLOR:Cb});var gS=Math.PI/4,yS=3/5;var Rn={NONE:0,NOT_READY:1,NO_FIT:2,DEPTH:3,OCCUPANCY:4,SPACING:5,ANGLE:6,FACING:7};var _S=new class{constructor(){this._cache={}}getColor(...i){let e=i.pop(),t=i.join("_"),{_cache:n}=this;return t in n||(e.setHSL(Math.random(),1,.5),n[t]=e.getHex()),e.set(n[t])}};var xS={[Rn.NONE]:16777215,[Rn.NOT_READY]:7829367,[Rn.NO_FIT]:2250239,[Rn.DEPTH]:4473924,[Rn.OCCUPANCY]:65535,[Rn.SPACING]:16776960,[Rn.ANGLE]:16711680,[Rn.FACING]:16711935};var vS=Math.PI/180;var bS=Bs*Math.PI*2;var MS=Bs*Math.PI*2;var Xh=new WeakMap,To=class extends bi{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,s){let r=new Ci(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},n,s)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,rt,n).catch(n)}decodeDracoFile(e,t,n,s,r=Tt,a=()=>{}){let o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Xh.has(e)){let l=Xh.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s,r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(l=>(s=l,new Promise((c,h)=>{s._callbacks[r]={resolve:c,reject:h},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),Xh.set(e,{key:n,promise:o}),o}_createGeometry(e){let t=new _t;e.index&&t.setIndex(new je(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let s=e.attributes[n],r=s.name,a=s.array,o=s.itemSize,l=new je(a,o);r==="color"&&(this._assignVertexColorSpace(l,s.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),t.setAttribute(r,l)}return t}_assignVertexColorSpace(e,t){if(t!==rt)return;let n=new Se;for(let s=0,r=e.count;s<r;s++)n.fromBufferAttribute(e,s),Fe.toWorkingColorSpace(n,rt),e.setXYZ(s,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new Ci(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((s,r)=>{n.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let s=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let r=Rb.toString(),a=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){let a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function Rb(){let i,e;onmessage=function(a){let o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(h){i.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(i)});break;case"decode":let l=o.buffer,c=o.taskConfig;e.then(h=>{let u=h.draco,d=new u.Decoder;try{let f=t(u,d,new Int8Array(l),c),m=f.attributes.map(y=>y.array.buffer);f.index&&m.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},m)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{u.destroy(d)}});break}};function t(a,o,l,c){let h=c.attributeIDs,u=c.attributeTypes,d,f,m=o.GetEncodedGeometryType(l);if(m===a.TRIANGULAR_MESH)d=new a.Mesh,f=o.DecodeArrayToMesh(l,l.byteLength,d);else if(m===a.POINT_CLOUD)d=new a.PointCloud,f=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());let y={index:null,attributes:[]};for(let g in h){let p=self[u[g]],T,x;if(c.useUniqueIDs)x=h[g],T=o.GetAttributeByUniqueId(d,x);else{if(x=o.GetAttributeId(d,a[h[g]]),x===-1)continue;T=o.GetAttribute(d,x)}let v=s(a,o,d,g,p,T);g==="color"&&(v.vertexColorSpace=c.vertexColorSpace),y.attributes.push(v)}return m===a.TRIANGULAR_MESH&&(y.index=n(a,o,d)),a.destroy(d),y}function n(a,o,l){let h=l.num_faces()*3,u=h*4,d=a._malloc(u);o.GetTrianglesUInt32Array(l,u,d);let f=new Uint32Array(a.HEAPF32.buffer,d,h).slice();return a._free(d),{array:f,itemSize:1}}function s(a,o,l,c,h,u){let d=u.num_components(),m=l.num_points()*d,y=m*h.BYTES_PER_ELEMENT,g=r(a,h),p=a._malloc(y);o.GetAttributeDataArrayForAllPoints(l,u,g,y,p);let T=new h(a.HEAPF32.buffer,p,m).slice();return a._free(p),{name:c,array:T,itemSize:d}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}var tt=i=>document.getElementById(i),Pb=new URLSearchParams(location.search),jh=Pb.get("test")==="1",Co={get:(i,e)=>{try{let t=localStorage.getItem(i);return t==null?e:JSON.parse(t)}catch{return e}},set:(i,e)=>{try{localStorage.setItem(i,JSON.stringify(e))}catch{}}},Ib=i=>{try{parent!==window&&parent.postMessage(i,"*")}catch{}},kr=(i,e=2600)=>{let t=tt("toast");t.textContent=i,t.classList.add("on"),clearTimeout(kr.t),kr.t=setTimeout(()=>t.classList.remove("on"),e)},Ao=Math.PI/180,Lb={schlossplatz:{n:"Schlossplatz",lat:48.77845,lon:9.17965,h:296,spawn:{x:-70,z:25,yaw:-90*Ao},radius:230}},en=Lb.schlossplatz,tn=new Cs({antialias:!0,powerPreference:"high-performance"});tn.setPixelRatio(Math.min(window.devicePixelRatio,2));tn.setSize(innerWidth,innerHeight);tn.outputColorSpace=rt;tt("stage").appendChild(tn.domElement);var In=new La,Ii=new gt(70,innerWidth/innerHeight,.2,6e3);In.add(Ii);{let i=document.createElement("canvas");i.width=2,i.height=256;let e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,256);t.addColorStop(0,"#6f9fd6"),t.addColorStop(.55,"#b9d2ea"),t.addColorStop(1,"#e8eef2"),e.fillStyle=t,e.fillRect(0,0,2,256);let n=new mr(i);n.colorSpace=rt,In.background=n}In.fog=new Ia(13622760,900,4500);In.add(new Va(16777215,8947848,2.2));var ft=null,Br=null;function Db(i){if(jh){Br=Nb(),In.add(Br);return}ft=new Rh,ft.registerPlugin(new Lh({apiToken:i,autoRefreshToken:!0}));let e=new To().setDecoderPath("stadt/draco/");ft.registerPlugin(new Hh({dracoLoader:e})),ft.registerPlugin(new Gh({lat:en.lat*Ao,lon:en.lon*Ao,height:en.h})),ft.registerPlugin(new Wh),ft.registerPlugin(new kh),ft.errorTarget=Yh?10:6,ft.lruCache.minBytesSize=.18*2**30,ft.lruCache.maxBytesSize=(Yh?.3:.6)*2**30,ft.setCamera(Ii),ft.setResolutionFromRenderer(Ii,tn),ft.addEventListener("load-error",t=>{let n=String(t.error&&t.error.message||t.error||"");console.warn("tile",n),/40[13]/.test(n)?Vr(n):!be.settled&&!Vr.shown&&(tt("loadtxt").innerHTML="\u015Eehir y\xFCklenemedi: "+n.slice(0,120)+'<br><button class="btn" id="retry">Tekrar dene</button> <button class="btn" id="rekey">Anahtar\u0131 de\u011Fi\u015Ftir</button>',tt("retry").onclick=()=>location.reload(),tt("rekey").onclick=()=>{Co.set("gp-gkey",""),location.reload()})}),ft.addEventListener("tiles-load-end",()=>{Ub=!0}),In.add(ft.group),Br=ft.group}var Yh=matchMedia("(pointer:coarse)").matches,Ub=!1;function Nb(){let i=new At,e=new ct(new yn(600,600,1,1),new vi({color:10132111}));e.rotation.x=-Math.PI/2,i.add(e);let t=new vi({color:14207400});[[40,0,30,20,18],[-120,10,20,60,22],[0,-90,90,20,25],[-40,60,8,8,30]].forEach(([s,r,a,o,l])=>{let c=new ct(new Wi(a,l,o),t);c.position.set(s,l/2,r),i.add(c)});let n=new ct(new Wi(20,.35,20),new vi({color:7829367}));return n.position.set(-60,.175,25),i.add(n),In.add(new Ds(16777215,2).translateY(100)),i}var Ob=1.68,Fb=.35,bp=.55,Bb=1.6,kb=4.2,be={p:new C(en.spawn.x,60,en.spawn.z),yaw:en.spawn.yaw,pitch:-.03,vy:0,ground:null,run:!1,settled:!1},Fr=new Us;Fr.firstHitOnly=!0;var zb=new C(0,-1,0),Vb=new C,Pp=new C;function Ip(i,e,t){if(!Br)return null;Fr.set(i,e),Fr.far=t,Fr.near=0;let n=Fr.intersectObject(Br,!0);return n.length?n[0]:null}function Mp(i,e,t){let n=Ip(Pp.set(i,t,e),zb,400);return n?n.point.y:null}var Xt={};addEventListener("keydown",i=>{Xt[i.code]=!0,i.code==="ShiftLeft"&&(be.run=!0)});addEventListener("keyup",i=>{Xt[i.code]=!1,i.code==="ShiftLeft"&&(be.run=!1)});var bt={id:null,x:0,y:0,cx:0,cy:0},Si={id:null,x:0,y:0},wo=tt("stick"),Lp=tt("knob"),zr=tn.domElement;zr.addEventListener("pointerdown",i=>{i.clientX<innerWidth*.45&&bt.id==null&&i.pointerType!=="mouse"?(bt.id=i.pointerId,bt.cx=i.clientX,bt.cy=i.clientY,bt.x=bt.y=0,wo.style.left=i.clientX+"px",wo.style.top=i.clientY+"px",wo.classList.add("on")):Si.id==null&&(Si.id=i.pointerId,Si.x=i.clientX,Si.y=i.clientY),zr.setPointerCapture(i.pointerId)});zr.addEventListener("pointermove",i=>{if(i.pointerId===bt.id){let e=i.clientX-bt.cx,t=i.clientY-bt.cy,n=Math.hypot(e,t),s=55;n>s&&(e*=s/n,t*=s/n),bt.x=e/s,bt.y=t/s,Lp.style.transform=`translate(${e}px,${t}px)`,be.run=n>s*1.35||tt("run").classList.contains("on")}else if(i.pointerId===Si.id){let e=Yh?.0055:.0035;be.yaw-=(i.clientX-Si.x)*e,be.pitch=Math.max(-1.25,Math.min(1.25,be.pitch-(i.clientY-Si.y)*e)),Si.x=i.clientX,Si.y=i.clientY}});var Dp=i=>{i.pointerId===bt.id&&(bt.id=null,bt.x=bt.y=0,Lp.style.transform="",wo.classList.remove("on"),be.run=tt("run").classList.contains("on")),i.pointerId===Si.id&&(Si.id=null)};zr.addEventListener("pointerup",Dp);zr.addEventListener("pointercancel",Dp);tt("run").onclick=()=>{tt("run").classList.toggle("on"),be.run=tt("run").classList.contains("on")};var Sp=new C,Tp=new C,Pi=new C,qh=0;function Eo(i){let e=bt.x,t=bt.y;(Xt.KeyW||Xt.ArrowUp)&&(t-=1),(Xt.KeyS||Xt.ArrowDown)&&(t+=1),(Xt.KeyA||Xt.ArrowLeft)&&(e-=1),(Xt.KeyD||Xt.ArrowRight)&&(e+=1);let n=Math.min(1,Math.hypot(e,t));if(Sp.set(-Math.sin(be.yaw),0,-Math.cos(be.yaw)),Tp.set(Math.cos(be.yaw),0,-Math.sin(be.yaw)),Pi.set(0,0,0).addScaledVector(Sp,-t).addScaledVector(Tp,e),Pi.lengthSq()>0&&Pi.normalize().multiplyScalar((be.run?kb:Bb)*n*i),!be.settled){if(qh-=i,qh>0)return;qh=.25;let a=Mp(be.p.x,be.p.z,300);a!=null&&(be.p.y=a,be.ground=a,be.settled=!0,Gb());return}if(Pi.lengthSq()>0){let a=Pi.length(),o=Vb.copy(Pi).normalize();for(let l of[.6,1.3]){let c=Ip(Pp.set(be.p.x,be.p.y+l,be.p.z),o,a+Fb);if(c){let h=c.face?c.face.normal.clone().transformDirection(c.object.matrixWorld):o.clone().negate();h.y=0,h.lengthSq()<1e-4&&h.copy(o).negate(),h.normalize(),Pi.addScaledVector(h,-Pi.dot(h));break}}}let s=be.p.x+Pi.x,r=be.p.z+Pi.z;if(Math.hypot(s,r)>en.radius)Eo.warned||(kr("Bu b\xF6lgenin sonu. S\u0131radaki b\xF6lgeler yak\u0131nda a\xE7\u0131lacak."),Eo.warned=!0,setTimeout(()=>Eo.warned=!1,6e3));else{let a=Mp(s,r,be.p.y+bp+1.2);a!=null&&a-be.p.y<=bp?(be.p.x=s,be.p.z=r,be.ground=a):a==null&&(be.p.x=s,be.p.z=r)}be.ground!=null&&(be.p.y>be.ground+.02?(be.vy-=9.8*i,be.p.y=Math.max(be.ground,be.p.y+be.vy*i)):(be.vy=0,be.p.y+=(be.ground-be.p.y)*Math.min(1,i*14)))}var wp=0;function Hb(i){let e=Math.hypot(bt.x,bt.y)||(Xt.KeyW||Xt.KeyS||Xt.KeyA||Xt.KeyD?1:0);wp+=i*e*(be.run?11:7.5);let t=e?Math.sin(wp)*(be.run?.045:.025):0;Ii.position.set(be.p.x,be.p.y+Ob+t,be.p.z),Ii.rotation.set(be.pitch,be.yaw,0,"YXZ")}function Gb(){tt("load").classList.add("out"),setTimeout(()=>kr(en.n+" \xB7 Stuttgart"),400)}function Wb(){let i=(-be.yaw/Ao%360+360)%360;tt("needle").style.transform=`rotate(${-i}deg)`}function Xb(){if(!ft){tt("attr").textContent=jh?"TEST \xB7 Google yok":"";return}let e=ft.getAttributions().filter(t=>t.type==="string").map(t=>t.value).join(" \xB7 ");tt("attr").textContent="Google"+(e?" \xB7 "+e:"")}function Vr(i){Vr.shown||(Vr.shown=!0,tt("load").classList.remove("out"),tt("loadtxt").innerHTML='Google anahtar\u0131 kabul edilmedi. Anahtar\u0131 ve k\u0131s\u0131tlamalar\u0131n\u0131 kontrol et.<br><button class="btn" id="rekey">Anahtar\u0131 de\u011Fi\u015Ftir</button>',tt("rekey").onclick=()=>{Co.set("gp-gkey",""),location.reload()})}tt("back").onclick=()=>Ib("game-exit");addEventListener("resize",()=>{Ii.aspect=innerWidth/innerHeight,Ii.updateProjectionMatrix(),tn.setSize(innerWidth,innerHeight),ft&&ft.setResolutionFromRenderer(Ii,tn)});var Ep=performance.now(),Ap=0;function Up(i){requestAnimationFrame(Up);let e=Math.min(.05,(i-Ep)/1e3);Ep=i,Eo(e),Hb(e),Wb(),ft&&(Ii.updateMatrixWorld(),ft.update()),tn.render(In,Ii),(Ap+=e)>2&&(Ap=0,Xb())}function Cp(i){tt("keybox").hidden=!0,tt("loadtxt").textContent="Stuttgart y\xFCkleniyor\u2026 "+en.n,Db(i),requestAnimationFrame(Up),setTimeout(()=>{!be.settled&&!Vr.shown&&(tt("loadtxt").textContent="\u015Eehir geliyor, internet yava\u015Fsa biraz s\xFCrebilir\u2026")},12e3)}var Rp=Co.get("gp-gkey","");jh||Rp?Cp(Rp):(tt("keybox").hidden=!1,tt("loadtxt").textContent="",tt("keyok").onclick=()=>{let i=tt("keyin").value.trim();if(!/^AIza[0-9A-Za-z_\-]{20,}$/.test(i)){kr("Bu bir Google API anahtar\u0131na benzemiyor (AIza\u2026 ile ba\u015Flar)");return}Co.set("gp-gkey",i),Cp(i)});window.__st={me:be,get tiles(){return ft}};
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
