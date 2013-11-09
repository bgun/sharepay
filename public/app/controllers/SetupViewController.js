App.SongViewController = {
	showSongListenView: function(songId) {
		console.log('SongViewController listen', songId);
		var songView = new App.Views.SongView({
			songId: songId,
			model: App.song
		});
	},
	createSong: function() {
		console.log('SongController: creating a song');
		var songRef = App.firebase.createSong();
		var song = new App.Models.SongModel({
			id: songRef.name(),
			firebaseRef: songRef
		});
		App.songs.add(song);
		console.log('going to song', songRef.name());
		App.router.navigate('song/' + songRef.name(), {trigger: true});
	},
	showSongLandingView: function(songId) {
		console.log('song landing', songId);
		var songView = new App.Views.SongLandingView({
			songId: songId,
			model: App.songs.get(songId)
		}).render();
	}
};