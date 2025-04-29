# Test FLow

> After each modification of the file, you need to manually execute the compilation (without adding watch)

Build `dist/bin/cli.js` form `src/bin/cli.ts`

```bash
$ npx tsc
```

Manual test
```bash
$ node ./dist/bin/cli.js losslessSquash -s /Users/imagine/project/packages/bear-node-imagemin/packages/acrool-svg-symbols-cli2/static/fixture.jpg -t /Users/imagine/project/packages/bear-node-imagemin/packages/acrool-svg-symbols-cli2/static/output_losslessSquash.png -w 240
$ node ./dist/bin/cli.js lossySquash -s /Users/imagine/project/packages/bear-node-imagemin/packages/acrool-svg-symbols-cli2/static/fixture.jpg -t /Users/imagine/project/packages/bear-node-imagemin/packages/acrool-svg-symbols-cli2/static/output_losslessSquash.png -w 240 -q 90
```

Jest test 
```
$ yarn test
```
