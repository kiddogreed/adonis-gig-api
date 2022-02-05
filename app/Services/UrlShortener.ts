import Env from '@ioc:Adonis/Core/Env'
import axios, { AxiosResponse } from "axios";
/**
 * UrlShortener class
 *
 * @class UrlShortener
 * @constructor
 */

export default class UrlShortener {
  public async generate(url, duration = 1) {
    try {
      const result: AxiosResponse = await axios.post(
        `${Env.get("DOC_LINK_URL")}`,
        {
          app: "GIG API",
          environment: Env.get("NODE_ENV"),
          url: url,
          duration: duration,
        },
        {
          headers: {
            "api-auth-key": Env.get("DOC_LINK_KEY"),
          },
        }
      );
        console.log(result)
      return result.data.data.link;
    } catch (error) {
      console.log("URL SHORTENER ERROR", error);
      return url;
    }
  }
}

module.exports = UrlShortener;
