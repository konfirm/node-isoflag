# ISO Flags

The Unicode Consortium has made it possible to convert the two letter region codes (defined in ISO-3166, alpha2) into their flag representation, this library does this for you in JavaScript.

## Installation

```
$ npm install @konfirm/isoflag
```

## Usage

```
const Flag = require('@konfirm/isoflag');

const flagNL = Flag.factory('NL');
const flagBE = new Flag('BE');
```

### Creating an instance

The ISOFlag class provides two means to obtain an instance, the most obvious one being using the `new` syntax.

```js
const Flag = require('@konfim/isoflag');
const flagDE = new Flag('DE');
```

If you have a need for a lot of flag instances and/or want to be able to compare instances, you can use the `ISOFlag.factory` method, which caches instances.

```js
const Flag = require('@konfirm/isoflag');
const flagPO = Flag.factory('PO');
```

## API

### ISOFlag.factory(string iso)

The static `factory` method is used to create and cache instances for re-use. Use the `factory` method if you need/want to compare instances directly.

```js
const Flag = require('@konfirm/isoflag');
const flagES = Flag.factory('ES');

if (flagES === Flag.factory('es')) {
	//  both are the exact same instance
}
```

### ISOFlag.hasFlag(string iso)

The static `hasFlag` quickly determines whether or not an ISOFlag instance can be created for the specified ISO-3166 alpha2 code.

```js
const Flag = require('@konfirm/isoflag');

if (Flag.hasFlag('US')) {
	//  the 'US' region has a flag
}

if (Flag.hasFlag('QQ')) {
	//  this is never reached
} else {
	//  'QQ' is not a valid region :()
}
```

### flag.getUnicode()

Obtain the unicode character index representing the flag. These codepoints represent characters like 🇷 and 🇷, which - when used combined - is turned into 🇷🇸 (dependending on your font-set, you may not see a flag);

```js
const Flag = require('@konfirm/isoflag');
const flagRS = new Flag('RS');

const indices = flagRS.getUnicode();

// [127479, 127480]
```

### flag.toHTMLEntities()

Characters in HTML can be represented by their character index within the unicde standard, ISOFlag provides the hexadecimal notation of these entities.

```js
const Flag = require('@konfirm/isoflag');
const flagCH = new Flag('CH');

const entities = flagCH.toHTMLEntities();

// &#x1f1e8;&#x1f1ed;
```

### flag.toUnicodeSymbol()

Represent the flag as its unicode emoji

```js
const Flag = require('@konfirm/isoflag');
const flagDK = new Flag('DK');

const symbol = flagDK.toUnicodeSymbol();

// 🇩🇰
```

### String(flag)

Flag instances can be turned into string, it is the same as using `toUnicodeSymbol()` on the instance

```js
const Flag = require('@konfirm/isoflag');
const flagSE = new Flag('SE');

const symbol = String(flagSE);

// 🇸🇪
```

## License

MIT License Copyright (c) 2018 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
