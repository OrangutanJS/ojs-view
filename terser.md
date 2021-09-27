To create production version in dist directory:

install terser if not installed
```
npm i -g terser 
```

and in console

```
terser oView.js -c -m toplevel,reserved=["oView, config", "url", "method", "responseType"] -o "../dist/oView.js"
```
