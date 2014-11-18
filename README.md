Spuitをgulp単体やRails+gulpで動かす際に使うテンプレート
==============

## Spuitとは

[spuit](https://github.com/is8r/spuit)

## Gulpで使う場合
	
1.  このリポジトリをクローン

	```
	$ git clone git@github.com:is8r/spuit-gulp-template.git
	```
	
2.	gulpタスクを実行(default)
	
	
	```
	$ gulp
	```
	
	/assets 以下のファイルを変更したら
	/public/images,	/public/javascripts,	/public/stylesheets	が書出される。


## Railsで使う場合

1.  railsプロジェクト内にgulpフォルダを作って移動
	
	```
	$ cd /rails-project/gulp
	```
	
2.  このリポジトリをクローン

	```
	$ git clone git@github.com:is8r/spuit-gulp-template.git
	```
	
3.	gulpタスクを実行
	
	
	```
	$ gulp rails
	```
	
	/gulp/assets 以下のファイルを変更したら
	/public/images,	/public/javascripts,	/public/stylesheets	が書出される。
	
4.	hamlにインクルード

    = stylesheet_link_tag '/stylesheets/styles.css'
    = javascript_include_tag 'application', '/javascripts/scripts.min.js', 'data-turbolinks-track' => true

