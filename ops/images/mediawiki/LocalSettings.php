<?php
# Further documentation for configuration settings may be found at:
# https://www.mediawiki.org/wiki/Manual:Configuration_settings

# Protect against web entry
if ( !defined( 'MEDIAWIKI' ) ) {
	exit;
}

## Uncomment this to disable output compression
# $wgDisableOutputCompression = true;

$wgSitename = "Кочерга";
$wgMetaNamespace = "Мета";

## The URL base path to the directory containing the wiki;
## defaults for all runtime URL paths are based off of this.
## For more information on customizing the URLs
## (like /w/index.php/Page_title to /wiki/Page_title) please see:
## https://www.mediawiki.org/wiki/Manual:Short_URL
$wgScriptPath = "";
$wgArticlePath = "$wgScriptPath/$1";

## The protocol and server name to use in fully-qualified URLs
$wgServer = "https://" . getenv('WIKI_DOMAIN');

## The URL path to static resources (images, scripts, etc.)
$wgResourceBasePath = $wgScriptPath;

## The URL path to the logo.  Make sure you change this from the default,
## or else you'll overwrite your logo when you upgrade!
$wgLogo = "$wgResourceBasePath/resources/assets/kch.png";

$wgLogoHD = [
    "2x" => "$wgResourceBasePath/resources/assets/kch-2x.png"
];

## UPO means: this is also a user preference option

$wgEnableEmail = true;
$wgEnableUserEmail = true; # UPO

$wgEmergencyContact = "apache@" . getenv('WIKI_DOMAIN');
$wgPasswordSender = "apache@" . getenv('WIKI_DOMAIN');

$wgEnotifUserTalk = false; # UPO
$wgEnotifWatchlist = false; # UPO
$wgEmailAuthentication = false;

## Database settings
$wgDBtype = "mysql";
$wgDBserver = getenv('DB_HOST');
$wgDBname = getenv('DB_NAME');
$wgDBuser = getenv('DB_USER');
$wgDBpassword = getenv('DB_PASSWORD');

# MySQL table options to use during installation or update
$wgDBTableOptions = "ENGINE=InnoDB, DEFAULT CHARSET=utf8";

# Experimental charset support for MySQL 5.0.
$wgDBmysql5 = false;

## Shared memory settings
$wgMainCacheType = CACHE_MEMCACHED;
$wgMemCachedServers = [ getenv('MEMCACHED_HOST') . ':11211' ];

## To enable image uploads, make sure the 'images' directory
## is writable, then set this to true:
$wgEnableUploads = true;
$wgUploadDirectory = '/does/not/exist'; # uploads are handled through AWS extension
$wgUploadPath = $wgScriptPath.'/img_auth.php';
#$wgUseImageMagick = true;
#$wgImageMagickConvertCommand = "/usr/bin/convert";

$wgAllowImageTag = true; # allow <img> tag for cases when it's convenient (e.g., cookies rating)

$wgFileExtensions[] = 'pdf';
$wgFileExtensions[] = 'zip';
$wgFileExtensions[] = 'doc';
$wgFileExtensions[] = 'docx';

# Seems to be incompatible with MsUpload
# $wgStrictFileExtensions = false;

# InstantCommons allows wiki to use images from https://commons.wikimedia.org
$wgUseInstantCommons = false;

# Periodically send a pingback to https://www.mediawiki.org/ with basic data
# about this MediaWiki instance. The Wikimedia Foundation shares this data
# with MediaWiki developers to help guide future development efforts.
$wgPingback = true;

## If you use ImageMagick (or any other shell command) on a
## Linux server, this will need to be set to the name of an
## available UTF-8 locale
$wgShellLocale = "en_US.utf8";

## Set $wgCacheDirectory to a writable directory on the web server
## to make your wiki go slightly faster. The directory should not
## be publically accessible from the web.
#$wgCacheDirectory = "$IP/cache";

# Site language code, should be one of the list in ./languages/data/Names.php
$wgLanguageCode = "ru";

$wgLocaltimezone = "Europe/Moscow";

$wgSecretKey = getenv('SECRET_KEY');

# Changing this will log out all existing sessions.
$wgAuthenticationTokenVersion = "1";

# Site upgrade key. Must be set to a string (default provided) to turn on the
# web installer while LocalSettings.php is in place
$wgUpgradeKey = "f977254bae6a6bb5";

## For attaching licensing metadata to pages, and displaying an
## appropriate copyright notice / icon. GNU Free Documentation
## License and Creative Commons licenses are supported so far.
$wgRightsPage = ""; # Set to the title of a wiki page that describes your license/copyright
$wgRightsUrl = "";
$wgRightsText = "";
$wgRightsIcon = "";

# Path to the GNU diff3 utility. Used for conflict resolution.
$wgDiff3 = "/usr/bin/diff3";

# The following permissions were set based on your choice in the installer
$wgGroupPermissions['*']['createaccount'] = false;
$wgGroupPermissions['*']['edit'] = false;
$wgGroupPermissions['*']['read'] = false;

$wgGroupPermissions['user']['noratelimit'] = true;

$wgRestrictDisplayTitle = false;
$wgAllowDisplayTitle = true;

## Default skin: you can change the default skin. Use the internal symbolic
## names, ie 'vector', 'monobook':
$wgDefaultSkin = "vector";

# Enabled skins.
wfLoadSkin('Vector');
wfLoadSkin('MinervaNeue');

$wgBlockDisablesLogin = true;

$wgNamespacesWithSubpages[NS_MAIN] = true;

# Enabled extensions. Most of the extensions are enabled by adding
# wfLoadExtensions('ExtensionName');
# to LocalSettings.php. Check specific extension documentation for more details.
####################### Extensions #########################

wfLoadExtension('Cite');
wfLoadExtension('ParserFunctions');
wfLoadExtension('Renameuser');

wfLoadExtension( 'Gadgets' );
$wgGroupPermissions['sysop']['gadgets-edit'] = true;
$wgGroupPermissions['sysop']['gadgets-definition-edit'] = true;
$wgGadgetsRepoClass = 'GadgetDefinitionNamespaceRepo';

# wfLoadExtension('WikiEditor');
# $wgDefaultUserOptions['usebetatoolbar'] = 1;
# $wgDefaultUserOptions['wikieditor-preview'] = 1;
$wgVisualEditorEnableWikitext = true;
$wgDefaultUserOptions['visualeditor-newwikitext'] = 1;
$wgHiddenPrefs[] = 'visualeditor-newwikitext';

if ( defined(getenv('GOOGLE_LOGIN_APP_ID')) ) {
    wfLoadExtension('GoogleLogin');
    $wgGLAppId = getenv('GOOGLE_LOGIN_APP_ID');
    $wgGLSecret = getenv('GOOGLE_LOGIN_SECRET');
}

$wgWhitelistRead = ['Special:GoogleLoginReturn', 'Служебная:GoogleLoginReturn'];

wfLoadExtension('UserMerge');
$wgGroupPermissions['sysop']['usermerge'] = true;
$wgUserMergeProtectedGroups = [];

$wgShowExceptionDetails = true;

wfLoadExtension('EditAccount');
$wgGroupPermissions['editaccount']['editaccount'] = true;

if (getenv('SLACK_NOTIFICATIONS_WEBHOOK')) {
    wfLoadExtension('SlackNotifications');
    $wgSlackIncomingWebhookUrl = getenv('SLACK_NOTIFICATIONS_WEBHOOK');
    $wgSlackFromName = "Wiki";
    $wgWikiUrl      = "https://" . getenv('WIKI_DOMAIN'). "/";
    $wgWikiUrlEnding = "index.php?title=";
    $wgSlackSendMethod = "file_get_contents";  # this is important! "curl" method is broken and adds junk characters to JSON, which causes VisualEditor errors.
    $wgSlackExcludeNotificationsFrom = ["Участник:", "Участница:"];
    $wgSlackIgnoreMinorEdits = false;
}

wfLoadExtension('MsUpload');

wfLoadExtension('InputBox');

wfLoadExtension( 'MobileFrontend' );
$wgMFAutodetectMobileView = true;
$wgMFDefaultSkinClass = 'SkinMinerva';
$wgMFRemovableClasses = [
    "beta" => [],
    "base" => [
        ".toc",
        ".nomobile"
    ]
];

wfLoadExtension('Cargo');
wfLoadExtension('PageForms');

wfLoadExtension( 'VisualEditor' );
$wgDefaultUserOptions['visualeditor-enable'] = 1;

$wgVirtualRestConfig['modules']['parsoid'] = array(
    'url' => 'http://' . getenv('PARSOID_HOST'),
    'domain' => 'wiki',
);
$wgVirtualRestConfig['modules']['parsoid']['forwardCookies'] = true;

wfLoadExtension( 'VEForAll' );
// wfLoadExtension( 'Flow' ); // necessary for action=flow-parsoid-utils which is used in (forked) Page Forms

wfLoadExtension( 'TemplateData' );
wfLoadExtension( 'Mermaid' );
wfLoadExtension( 'CategoryTree' );

wfLoadExtension( 'AWS' );
$wgAWSCredentials = [
	'key' => getenv('AWS_ACCESS_KEY'),
	'secret' => getenv('AWS_SECRET_KEY'),
	'token' => false
];
$wgAWSRegion = 'eu-central-1';
$wgAWSBucketName = getenv('AWS_BUCKET_NAME');
$wgAWSRepoHashLevels = '2';
$wgAWSRepoDeletedHashLevels = '3';
