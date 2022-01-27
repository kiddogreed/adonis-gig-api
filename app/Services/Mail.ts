'use strict'

import Bull from '@ioc:Rocketseat/Bull'
//import Welcome from 'App/Jobs/WelcomeEmail'
import Verification from 'App/Jobs/VerificationEmail'

export default class Mail {
  public async verification(data) {
    await Bull.add(new Verification().key, data)
  }

//   public async welcome(data) {
//     await Bull.add(new Welcome().key, data)
//   }
}