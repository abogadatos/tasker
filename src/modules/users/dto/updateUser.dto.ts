import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  /**
   *
   * -Must be a string with a minimum of 3 characters and a maximum of 80
   *
   * -It can be just a first name or you can also include your last name.
   *
   *@example "Carlos Fulano Márquez"
   */
  @IsOptional()
  @IsString()
  name: string;

  /**
   * -Must be a valid email address
   *
   * -The email is unique. An address for a registered user
   *
   *@example "example@example.com"
   */
  @IsOptional()
  @IsString()
  email: string;

  /**
   * -Must contains one of these special characters !@#$%^&_*
   *
   * -Must be a string with a minimum of 8 characters and a maximum of 15
   *
   * -Consider using a strong password
   *
   * -Remember to properly save your password
   *
   *@example "P@ssw0rd!"
   */
  @IsOptional()
  @IsString()
  password: string;

  /**
   * -Consider using a valid phone number
   *
   *@example "5565450967"
   */
  @IsOptional()
  @IsString()
  phone: string;

  /**
   * -Must be a string with a minimum of 4 characters and a maximum of 20
   *
   *@example "México"
   */
  @IsOptional()
  @IsString()
  country: string;

  /**
   * -Must be a string with a minimum of 3 characters and a maximum of 80
   *
   * -Must be a valid address location
   *
   *@example "P. Sherman 42 Wallaby Way, Sidney"
   */
  @IsOptional()
  @IsString()
  address: string;

  /**
   * -Must be a string with a minimum of 4 characters and a maximum of 20
   *
   *@example "Puebla"
   */
  @IsOptional()
  @IsString()
  city: string;
}
