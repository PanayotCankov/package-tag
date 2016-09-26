# Updates package.json version with tag
For example the following:
```
package-tag --tag beta
```
Will update the package.json in the current working directory by adding `-beta` to the version.

And the following will update the plugins in the two listed folders by adding `-beta`:
```
package-tag --tag beta my-plugin-1/ my-plugin-2
```

As another use case we are using this in CI where our Jenkins will tag packages with build numbers.
