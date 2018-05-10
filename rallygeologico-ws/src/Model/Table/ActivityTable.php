<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Activity Model
 *
 * @property \App\Model\Table\SiteTable|\Cake\ORM\Association\BelongsTo $Site
 * @property \App\Model\Table\OptionsTable|\Cake\ORM\Association\HasMany $Options
 * @property \App\Model\Table\MultimediaTable|\Cake\ORM\Association\BelongsToMany $Multimedia
 *
 * @method \App\Model\Entity\Activity get($primaryKey, $options = [])
 * @method \App\Model\Entity\Activity newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Activity[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Activity|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Activity patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Activity[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Activity findOrCreate($search, callable $callback = null, $options = [])
 */
class ActivityTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('activity');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Site', [
            'foreignKey' => 'site_id'
        ]);
        $this->hasMany('Options', [
            'foreignKey' => 'activity_id'
        ]);
        $this->belongsToMany('Multimedia', [
            'foreignKey' => 'activity_id',
            'targetForeignKey' => 'multimedia_id',
            'joinTable' => 'activity_multimedia'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->integer('activity_type')
            ->requirePresence('activity_type', 'create')
            ->notEmpty('activity_type');

        $validator
            ->integer('points_awarded')
            ->requirePresence('points_awarded', 'create')
            ->notEmpty('points_awarded');

        $validator
            ->scalar('description')
            ->maxLength('description', 1000)
            ->allowEmpty('description');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['site_id'], 'Site'));

        return $rules;
    }
}
