import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({

    username: schema.string({
      trim: true
    }, [
      rules.unique({ table: 'users', column: 'username' }),
      rules.minLength(3),
      rules.maxLength(35),
      rules.regex(/^[a-zA-Z0-9]+$/)
    ]),
    password: schema.string({}, [
      rules.confirmed()
    ]),
    password_confirmation: schema.string({})
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'username.required': 'Please input username.',
    'username.unique': 'Your username is already associated to an existing account. Please choose a different username.',
    'username.minLength': 'Your username should be not less thatn three characters.',
    'username.maxLength': 'Your username is too long.',
    'username.regex': 'Only alphanumeric character is allowed.',
    'password.required': 'Please provide your password.',
    'password_confirmation.confirmed': 'Your passwords do not match. Please try again.'
   
  }
}
