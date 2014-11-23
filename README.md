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
	
1.  このリポジトリをクローン

	```
	$ git clone git@github.com:is8r/spuit-gulp-template.git
	```

2.  ディレクトリ名を任意のものに変更、移動
	
	```
	$ mv spuit-gulp-template gulp
	$ cd gulp
	```
	
3.	npm install

	```
	$ npm install
	```

4.	ディレクトリの移動とSpuit本体のGit Submoduleのクローン

	```
	$ cd assets/stylesheets/vendor
	$ g clone git@github.com:is8r/spuit.git
	$ cd ../../../
	```

4.	gulpタスクを実行
	
	
	```
	$ gulp rails
	```
	
	/gulp/assets 以下のファイルを変更したら
	/public/images,	/public/javascripts,	/public/stylesheets	が書出される。
	
5.	hamlにインクルード

	```
    = stylesheet_link_tag '/stylesheets/styles.css'
    = javascript_include_tag 'application', '/javascripts/scripts.min.js', 'data-turbolinks-track' => true
	```


