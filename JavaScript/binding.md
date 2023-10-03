# 바인딩 (Binding)

<br>

바인딩은 "묶다"라는 사전적 의미로, 코딩에서의 바인딩은 두 데이터 혹은 정보의 소스를 일치시키는 기법을 의미한다. 즉, 화면에 보이는 데이터와 브라우저 메모리에 있는 데이터(여러개의 JavaScript 객체)를 일치시키는 것을 말한다.

```js
function foo() {
   const a = 10;
   console.log(this.a);
}

foo(); // ?
```

처음 자바스크립트를 접할 때는 위 코드의 실행 결과 값이 10이기를 기대한다. 하지만 자바스크립트의 this는 그렇게 호락호락하지가 않다.
자바스크립트에서 this가 참조하는 것은 함수가 호출되는 방식에 따라 결정되는데, 이것을 "this binding"이라고 한다.
this 바인딩은 다음 4+1가지 규칙만 숙지하고 있으면 어떤 코드를 보더라도 this 바인딩이 헷갈리는 일은 없을 것이다.

-  기본 바인딩
-  암시적 바인딩
-  명시적 바인딩
-  new 바인딩
-  화살표 함수(ES6)

### 기본 바인딩 (Default Binding)

앞으로 설명할 4가지 자바스크립트의 this 바인딩 규칙 중 해당하는 것이 없을 때 적용이 되는 기본 규칙이다. 기본 바인딩이 적용될 경우 this는 전역 객체에 바인딩된다.(브라우저 환경인 경우 window, Node.js 환경인 경우 global)

```js
function foo() {
   const a = 10;
   console.log(this.a);
}

foo(); // undefined
```

위와 같은 경우 this는 전역객체에 바인딩되고 전역객체에는 a라는 프로퍼티가 없기 때문에 undefined가 출력된다. 전역객체에 a라는 프로퍼티가 있는 경우 해당 a프로퍼티의 값을 출력하게 된다.

```js
window.a = 10;

function foo() {
   console.log(this.a);
}

foo(); // 10
```

하지만 엄격모드에서는 기본 바인딩 대상에서 전역객체는 제외된다. 전역객체를 참조해야할 this가 있다면 그 값은 undefined가 된다.

```js
'use strict';
window.a = 20;

function foo() {
   console.log(this.a);
}

foo(); // TypeError: Cannot read property 'a' of undefined
```

### 암시적 바인딩 (Implicit Binding)

암시적 바인딩이란, 함수가 객체의 메서드로서 호출되는 상황에서 this가 바인딩되는 것을 말한다. 이때 this는 해당 함수를 호출한 객체, 즉 콘텍스트 객체에 바인딩된다.

```js
const foo = {
   a: 20,
   bar: function () {
      console.log(this.a);
   },
};

foo.bar(); // 20
```

암시적 바인딩을 사용할 때 발생할 수 있는 문제는 위와 같은 상황에서 함수를 매개변수(콜백)로 넘겨서 실행하는 것이다. 위와 같은 상황에서 다음과 같이 객체에 정의되어있는 함수의 레퍼런스를 매개변수로 전달하는 상황에서 어떤 결과가 나올까?

```js
setTimeout(foo.bar, 1); // ?
```

정답은 undefined이다.

이와 같은 결과가 나오는 이유는 결국 setTimeout 함수 안에 전달한 콜백은 bar라는 함수의 레퍼런스일 뿐, foo의 콘텍스트를 가지고 있지 않기 때문이다. 이런 상황을 암시적 바인딩이 소실되었다고 한다.

따라서 다음처럼 setTimeout 내부에서 호출되는 콜백은 foo 객체의 콘텍스트에서 실행되는 것이 아니기 때문에, this는 기본 바인딩이 적용돼서 전역 객체에 바인딩 된다.

```js
function setTimeout(cb, delay) {
   // delay 만큼 기다린다
   cb(); // 기본 바인딩, bar.foo()가 아닌 foo()와 같다
}
```

### 명시적 바인딩 (Explicit Binding)

자바스크립트의 모든 Function 은 call(), apply(), bind()라는 프로토타입 메소드를 가지고있다. 이 3가지 메서드 중 하나를 호출함으로써 this 바인딩을 코드에서 명시하는 것을 명시적 바인딩이라고 한다. 이때 this는 내가 명시한 객체에 바인딩된다.

```js
call(), apply();
const foo = {
   a: 20,
};

function bar() {
   console.log(this.a);
}

bar.call(foo); // 20
bar.apply(foo); // 20
```

bar의 Function 프로토타입 메서드 call, apply의 매개변수로 바인딩할 객체를 넘겨주면서 bar 함수를 실행할 때의 this 컨텍스트를 foo로 직접 바인딩 해주었다.

call과 apply의 동작은 같지만 두번째 매개변수로 객체의 인자를 전달해주는데(e.g. 생성자의 매개변수), call은 매개변수의 목록, apply는 배열을 받는다는 차이점이 있다.

```js
bind();
const foo = {
   a: 20,
};

function bar() {
   console.log(this.a);
}

const bound = bar.bind(foo);

bound(); // 20
```

bind 메서드는 매개변수로 전달받은 오브젝트로 this가 바인딩된 함수를 반환한다. 이것을 하드 바인딩이라고 하는데 하드 바인딩된 함수는 이후 호출될 때마다 처음 정해진 this 바인딩을 가지고 호출된다.

### new 바인딩 (new Binding)

자바스크립트의 new 키워드는 함수를 호출할 때 앞에 new 키워드를 사용하는 것으로 객체를 초기화할 때 사용하는데, 이때 사용되는 함수를 생성자 함수라고 한다.(컨벤션으로 생성자 함수는 대문자로 시작한다)

그리고 생성자 함수에서는 this키워드를 해당 생성자를 이용해 생성할 객체에 대한 참조로 사용한다.

```js
function Foo() {
   this.a = 20;
}

const foo = new Foo();

console.log(foo.a); // 20
```

위 코드에서 Foo 함수가 new 키워드와 함께 호출되는 순간 새로운 객체가 생성되고, 새로 생성된 객체가 this로 바인딩이 된다. 그리고 생성된 객체의 a라는 프로퍼티에 20이라는 값이 할당되고, 해당 객체는 foo라는 변수에 할당된다.

### 화살표 함수

ES6에 추가된 화살표 함수(Arrow Function)는 this를 바인딩할 때 앞서 설명한 규칙들이 적용되지 않고, this에 어휘적 스코프(Lexical scope)가 적용된다.즉, 화살표 함수를 정의하는 시점의 컨텍스트 객체가 this에 바인딩된다.

```js
const foo = {
   a: 20,
   bar: function () {
      setTimeout(() => {
         console.log(this.a);
      }, 1);
   },
};

foo.bar(); // 20
```

setTimeout의 콜백인 화살표 함수의 선언시에 this는 foo 객체를 가리키고 있기 때문에(렉시컬 스코프), 콜백이 실행될 때 this는 foo를 가리키게 된다.

화살표 함수로 선언시에 렉시컬 스코프를 통해 바인딩된 this는 apply, bind등의 함수나 new 함수로 오버라이드할 수 없다. 그렇기때문에 주로 콜백 함수로 사용할 때 유용하다.

### 그 외

\_this, that, self
apply, call, bind같은 바인딩 메소드, 또는 화살표 함수가 나오기 전에는 골치아픈 this 바인딩을 렉시컬 스코프를 이용해서 해결하였다. 호출시 결정되는 this를 렉시컬 스코프를 이용해 선언시에 정해주는 효과를 주는 것이다.

먼저 확인했던 것처럼, 아래와 같은 상황에서 setTimeout에 콜백으로 넘겨진 함수의 this는 setTimeout에 의해 실행될때 전역객체에 바인딩이 된다.

```js
const foo = {
   a: 20,
   bar: function () {
      setTimeout(function () {
         console.log(this.a);
      }, 1);
   },
};

foo.bar(); // undefined
```

이 때, setTimeout의 콜백 내부에서 해당 setTimeout을 호출한 객체에 접근하기 위해서 어떻게 해야할까?

```js
const foo = {
a: 20,
bar: function () {
const \_this = this;
setTimeout(function () {
console.log(\_this.a);
}, 1);
}
}

foo.bar(); // 20
```

위와 같이 bar메서드 실행시에 해당 메서드를 호출한 객체(foo)에 대한 참조를 \_this라는 변수에 할당하였다. 그러면 setTimeout의 콜백이 실행될때 렉시컬 스코프에 의해 \_this에 접근할 수가 있고, \_this를 통해 setTimeout을 호출한 객체(foo)에 접근할 수 있다.

이런 코드는 예전 레거시 코드에서 어렵지 않게 찾아볼 수 있다.
