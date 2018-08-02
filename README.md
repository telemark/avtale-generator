[![Build Status](https://travis-ci.org/telemark/avtale-generator.svg?branch=master)](https://travis-ci.org/telemark/avtale-generator)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# avtale-generator

Generator for avtaler og dokumenter

# Bruk

Jobber legges i kø-mappen (```test/directories/queue```)

En jobb må være en json-fil på formatet

```
{
  "_id": "58cbb44dd2852b00b7c77d42",
  "type": "elevpc",
  "category": "agreement",
  "personalId": "01010750160"
}
```

filnavnet må være ```${_id}.json```

Start roboten ```$ npm start```


# Se også

- [avtale-generate-grunnlag](https://github.com/telemark/avtale-generate-grunnlag)
- [robot-convert-docx-to-pdf](https://github.com/telemark/robot-convert-docx-to-pdf)
- [avtale-distribusjon](https://github.com/telemark/avtale-distribusjon)
- [avtale-laurentius]()
- [robot-post-payload](https://github.com/telemark/robot-post-payload)
- [avtale-logg](https://github.com/telemark/avtale-logg)

## License

[MIT](LICENSE)

![Robohash image of avtale-generator](https://robots.kebabstudios.party/avtale-generator.png "Robohash image of avtale-generator")