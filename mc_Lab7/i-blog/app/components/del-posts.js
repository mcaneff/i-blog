import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),
  actions: {
    delModal: function () {
      Ember.$('.ui.delPost.modal').parent("#"+this.$().attr("id")).children('.ui.delPost.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {
          this.get('DS').findRecord('post', document.getElementById(this.$().attr("id")).parentNode.id).then(function(post) {
            post.deleteRecord();
            post.save();
          });
        }
      })
        .modal('show');
    },
  }
});
