'use strict'

import Bull from '@ioc:Rocketseat/Bull'
import Verification from 'App/Jobs/VerificationEmail'

export default class Mail {
  public async verification(data) {
    await Bull.add(new Verification().key, data)
  }
}