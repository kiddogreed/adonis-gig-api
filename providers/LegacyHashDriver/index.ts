import bcrypt from 'bcryptjs';
import { HashDriverContract } from '@ioc:Adonis/Core/Hash';
/**
 * Implementation of custom bcrypt driver
 */
export class LegacyHashDriver implements HashDriverContract {
  /**
   * Hash value
   */
  public async make(value: string) {
    return bcrypt.hash(value);
  }
  /**
   * Verify value
   */
  public async verify(hashedValue: string, plainValue: string) {
    return bcrypt.compare(plainValue, hashedValue);
  }
}