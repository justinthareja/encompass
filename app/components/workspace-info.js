Encompass.WorkspaceInfoComponent = Ember.Component.extend(Encompass.CurrentUserMixin, Encompass.ErrorHandlingMixin, {
  elementId: 'workspace-info',
  comments: Ember.inject.controller,
  isEditing: false,
  selectedMode: null,
  updateRecordErrors: [],

  didInsertElement: function() {
    this.set('addEditorTypeahead', this.getAddableEditors.call(this));
  },

  willDestroyElement: function () {
    // do we need to be saving the workspace here?
    // what if a user was editing but never clicked save and they did not intend to save the changes?
    let workspace = this.get('workspace');
    workspace.save().catch((err) => {
      this.handleErrors(err, 'updateRecordErrors', workspace);
    });
    this._super(...arguments);
  },

  getAddableEditors: function() {
    const store = this.get('store');

    let ret = function(query, syncCb, asyncCb) {
      let selectedUsers = this.get('workspace.editors');

      let text = query.replace(/\W+/g, "");
      return store.query('user', {
        usernameSearch: text,
        }).then((users) => {
          if (!users) {
            return [];
          }

        users = users.rejectBy('accountType', 'S');


          let filtered = users.filter((user) => {
            return !selectedUsers.includes(user);
          });
          return asyncCb(filtered.toArray());
        })
        .catch((err) => {
          this.handleErrors(err, 'queryErrors');
        });
      };

      return ret.bind(this);
    },

  canEdit: Ember.computed('workspace.id', function () {
    let workspace = this.get('workspace');
    let owner = workspace.get('owner');
    let creator = owner.get('content');
    let currentUser = this.get('currentUser');
    let accountType = currentUser.get('accountType');
    let isAdmin = accountType === "A" ? true : false;
    let isOwner = creator.id === currentUser.id ? true : false;

    let canEdit = isAdmin || isOwner;
    return canEdit;
  }),

  modes: function () {
    return Permissions.modeValues();
  }.property(),

  actions: {
    removeEditor: function (editor) {
      let workspace = this.get('workspace');
      workspace.get('editors').removeObject(editor);
    },

    addEditor: function (editor) {
      let workspace = this.get('workspace');
      if (!workspace.get('editors').contains(editor)) {
        workspace.get('editors').pushObject(editor);
      }
    },

    editOwner: function () {
      this.set('isChangingOwner', true);
    },

    changeOwner: function (owner) {
      let workspace = this.get('workspace');
      workspace.set('owner', owner);
      workspace.save().then((res) => {
        this.set('isChangingOwner', false);

      }).catch((err) => {
        this.handleErrors(err, 'updateRecordErrors', workspace);
      });
    },

    editWorkspace: function () {
      this.set('isEditing', true);
      let workspace = this.get('workspace');
      this.set('selectedMode', workspace.get('mode'));
    },

    saveWorkspace: function () {
      // this.actions.changeMode.call(this);
      this.set('isEditing', false);
      let mode = this.get('selectedMode');
      let workspace = this.get('workspace');
      workspace.set('mode', mode);
      workspace.save().then((res) => {
        // handle success
      }).catch((err) => {
        this.handleErrors(err, 'updateRecordErrors', workspace);
      });

    }
  }

});



