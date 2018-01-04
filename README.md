# CollectCollect is a server to collect & archive websites written in NodeJS.It is intended for people who want to archive individual websites, eg```https://github.com/some/repo```Collect stores a static copy of the url on your disk## Features   * General      * Website archiving      * Website viewing   * Webinterface      * Add sites      * Browse your archive by domain      * Add sites to the archive      * Edit title of a saved page   * API (incomplete)      * Get all sites / sites by domain      * Get details of saved content      * Add a site to the archive### InstallationBefore installing Collect, please make sure that `git`, `node` and `npm` are installed.Start by cloning the repository to your computer/server:```git clone https://github.com/xarantolus/Collect.git```Go in the `Collect` directory```cd Collect/Collect```Install dependencies```npm install```To start, type```npm start```or ```node app```When you open the website in your browser, you will notice that you need to authenticate.#### SettingsTo change settings, edit `Collect/config.json`. There, you can set a `port`, `username`, `password` and `api_token`.Please don't use a password you use somewhere else. ## Security considerations   * The login system uses plain text## WarningYou're using this tool at your own risk. I am not responsible for any lost data like passwords or websites.## Credits   [The UIkit library](https://github.com/uikit/uikit): Copyright YOOtheme GmbH under the MIT license.## LicenseSee the [License file](LICENSE)