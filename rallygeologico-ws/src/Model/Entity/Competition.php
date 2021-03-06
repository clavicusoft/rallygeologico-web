<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Competition Entity
 *
 * @property int $id
 * @property int $is_active
 * @property \Cake\I18n\FrozenTime $starting_date
 * @property \Cake\I18n\FrozenTime $finishing_date
 * @property int $is_public
 * @property int $admin_id
 * @property string $description
 * @property string $name
 * @property int $rally_id
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\Rally $rally
 * @property \App\Model\Entity\CompetitionStatistic[] $competition_statistics
 * @property \App\Model\Entity\CompetitionStatisticsSite[] $competition_statistics_site
 * @property \App\Model\Entity\Invitation[] $invitation
 */
class Competition extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'is_active' => true,
        'starting_date' => true,
        'finishing_date' => true,
        'is_public' => true,
        'admin_id' => true,
        'description' => true,
        'name' => true,
        'rally_id' => true,
        'user' => true,
        'rally' => true,
        'competition_statistics' => true,
        'competition_statistics_site' => true,
        'invitation' => true
    ];
}
