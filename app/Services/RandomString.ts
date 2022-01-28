import randomstring from 'randomstring'

export default class RandomString {
  static generate(
    length,
    charset = "alphanumeric",
    capitalization = "uppercase"
  ) {
    const randomString = randomstring.generate({
      length: length,
      charset: charset,
      capitalization: capitalization,
    });

    return randomString;
  }
}
