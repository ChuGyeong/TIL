# this

<br>

### this

-  기본적으로 this는 전역 객체(브라우저에서 window) 참조 (예외: 'use strict')
-  일반 함수 또는 내부 함수의 this는 전역 객체를 참조
-  객체 메서드 또는 프로토타입 메서드에서 this는 해당 메서드를 호출한 객체 참조
-  생성자 함수 내부의 this는 생성된 객체 참조
-  DOM event handler로 사용되는 함수 내부의 this는 이벤트가 발생한 element로 설정

### 1. 전역에서의 this

```js
console.log(this); // window {...}
```

-  전역에서의 this는 기본적으로 window 객체

### 2. 일반 함수의 this

```js
function whatIsThis() {
   console.log(this);
}

whatIsThis(); // window
```

-  일반 함수에서의 this는 window
-  함수가 호출될 때 특별히 binding 된 사항 없이 독립적으로 실행, 이와 같이 전역에서 실행된 함수 내부의 this는 window

단, 예외 상황

```js
function whatIsThis() {
   'use strict';
   console.log(this);
}

whatIsThis(); // undefined
```

-  strict mode에서는 undefined 출력

### 3. 객체 메서드(method)의 this

```js
let apple = '독이 든 사과';
let home = {
   apple: '맛있는 사과',
   eatApple: eatAppleFn,
};

function eatAppleFn() {
   console.log(`백설공주가 ${this.apple}를 먹습니다.`);
}

// (1) 객체 method 호출
home.eatApple(); // 백설공주가 맛있는 사과를 먹습니다.

// (2) 함수 직접 호출
eatAppleFn(); // 백설공주가 독이 든 사과를 먹습니다.
```

-  객체의 method로 호출될 때 this는 해당 객체를 가리킨다.
-  함수를 어떻게 호출했느냐에 따라 this가 참조하는 객체가 다르다.

### 4. call, apply, bind를 이용한 호출

```js
let apple = '독이 든 사과';
let home = {
   apple: '맛있는 사과',
   eatApple: function () {
      eatAppleFn();
   },
   eatAppleCall: function () {
      // 여기서의 this는 home
      eatAppleFn.call(this);
   },
   eatAppleBind: function () {
      // 여기서의 this는 home
      eatAppleFn.bind(this)();
   },
};

function eatAppleFn() {
   console.log(`백설공주가 ${this.apple}를 먹습니다.`);
}

home.eatApple(); // 백설공주가 독이 든 사과를 먹습니다.
home.eatAppleCall(); // 백설공주가 맛있는 사과를 먹습니다.
home.eatAppleBind(); // 백설공주가 맛있는 사과를 먹습니다.
```

-  call, apply, bind를 이용하면 this를 원하는 객체에 연결할 수 있다.

### 5. 생성자 함수

```js
let sejelye = '백설공주';

function mirrorReply() {
   console.log(`세상에서 제일 예쁜 사람은 ${this.sejelye}입니다.`);
}

// 생성자 함수
function MagicMirror(name) {
   this.sejelye = name;
   this.reply = mirrorReply;
}

// 새로운 거울 생성
let newMirror = new MagicMirror('왕비님');

newMirror.reply(); // 세상에서 제일 예쁜 사람은 왕비님입니다.
```

-  new keyword를 사용하는 경우 생성자 함수 내의 this를 통해서 프로퍼티와 메서드를 추가할 수 있다. 생성자 함수 내의 this는 새로 생성된 객체를 가리키며 생성자 함수는 암묵적으로 this를 return 한다.
-  생성자 함수로 객체를 생성할 때, 생성자 함수의 this는 새로 생성된 객체를 가리킨다.

```js
let sejelye = '백설공주';

class MagicMirror {
   constructor(name) {
      this.sejelye = name;
   }

   mirrorReply() {
      console.log(`세상에서 제일 예쁜 사람은 ${this.sejelye}입니다.`);
   }
}

let newMirror = new MagicMirror('왕비님');

newMirror.mirrorReply(); // 세상에서 제일 예쁜 사람은 왕비님입니다.
```

-  ES6 클래스에서 생성자 내의 this는 생성한 인스턴스를 가리킨다.

### 6. DOM event handler에서의 this

```html
<button id="btn1">eventHandler</button>
<button id="btn2">eventHandler_bind</button>

<script>
   function alertThis() {
      alert('this: ' + this);
   }
   document.getElementById('btn1').addEventListener('click', alertThis); // this: HTMLButtonElement
   document.getElementById('btn2').addEventListener('click', alertThis.bind(this)); // this: window
</script>
```

-  함수를 event handler로 사용하는 경우, this는 이벤트를 발생시킨 요소로 설정된다. (구형 IE의 경우 일부 예외가 있을 수 있다.)
