import Controller from '@ember/controller';
import { ObjectQueryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/parcel-plug-manage/mixins/action-mixin';

import createLineItem from '@base-cms/parcel-plug-manage/gql/mutations/lineitem/create';

export default Controller.extend(ActionMixin, ObjectQueryManager, {
  actions: {
    /**
     *
     * @param {object} fields
     */
    async create() {
      this.startAction();
      const orderId = this.get('order.id');
      const { name } = this.get('model');
      const input = { name, orderId };
      const variables = { input };
      try {
        const response = await this.get('apollo').mutate({ mutation: createLineItem, variables }, 'createLineItem');
        await this.transitionToRoute('manage.lineitems.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    setFieldValue({ name, value }) {
      this.set(`model.${name}`, value);
    },
  },
});
