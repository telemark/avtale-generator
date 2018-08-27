[![Build Status](https://travis-ci.org/telemark/avtale-generator.svg?branch=master)](https://travis-ci.org/telemark/avtale-generator)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# avtale-generator

Generator for avtaler og dokumenter som skal signeres elektronisk.

# Bruk

Jobber legges i kø-mappen (```test/directories/queue```)

En jobb må være en json-fil på formatet

```JavaScript
{
  "_id": "58cbb44dd2852b00b7c77d42", // uuid
  "type": "elevpc",
  "category": "agreement",
  "personalId": "01010750160", // fødselsnummer
  "organization": "974568012" // organisasjonsnummer
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
- [avtale-templates](https://github.com/telemark/avtale-templates)
- [avtale-status](https://github.com/telemark/avtale-status)
- [avtale-dashboard](https://github.com/telemark/avtale-dashboard)
- [minelev-avtaler](https://github.com/telemark/minelev-avtaler)

## License

[MIT](LICENSE)