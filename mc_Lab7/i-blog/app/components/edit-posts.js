import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),
  actions: {
    editModal: function () {
      Ember.$('.ui.editPost.modal').parent("#"+this.$().attr("id")).children('.ui.editPost.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {

          this.get('DS').findRecord('post', this.get('id')).then(function(post) {
            post.get('title'); // => "Rails is Omakase"
            post.set('title', post.title);
            post.get('body'); // => "Rails is Omakase"
            post.set('body', post.body);

            post.save();
          });
        }
      })
        .modal('show');
    },
  }
});
