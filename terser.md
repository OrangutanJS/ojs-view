To create production version in dist directory:

install terser if not installed
```
npm i -g terser 
```

and in console

```
terser oView.js -c -m toplevel,reserved=["oView, config"] -o "../dist/oView.js" --source-map "root=oView.js,url=oView.js.map"

```
