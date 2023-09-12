# 호이스팅 (hoisting)

<br>

### 호이스팅이란

변수나 함수의 선언이 코드 최상단으로 끌어올려지는 듯한 현상

### 예시

```js
console.log(a); // undefined
var a = 1;
```

-  오류가 발생하지 않고 undefined 출력
-  프로그램 중간에서 변수나 함수를 선언하더라도 프로그램 선언에 선언된 것처럼 문자 앞에 생성

### 변수 호이스팅

-  자바스크립트의 모든 선언에 호이스팅 발생
-  그런데 let, const, class를 이용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다. 이는 스코프의 시작에서 변수의 선언까지 일시적 사각지대(TDZ)에 빠지기 때문이다.

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization 에러 발생
let a = 1;
```

-  let으로 선언된 a가 호이스팅은 되었지만, 값이 초기화가 되지 않아 에러 발생

```js
const a;
console.log(a);
```

-  선언된 a 변수에 값을 초기화 하지 않아 에러 발생 (const는 변수 선언과 초기화를 동시에 명시해 주어야 한다.)

```js
console.log(b);
const b = 1;
```

-  const 으로 선언된 uage 변수가 호이스팅은 되었지만, 초기화가 되지 않아 에러 발생
