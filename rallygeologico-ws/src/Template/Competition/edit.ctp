<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Competition $competition
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $competition->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $competition->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Competition'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Rally'), ['controller' => 'Rally', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Rally'), ['controller' => 'Rally', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Competition Statistics'), ['controller' => 'CompetitionStatistics', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Competition Statistic'), ['controller' => 'CompetitionStatistics', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Competition Statistics Site'), ['controller' => 'CompetitionStatisticsSite', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Competition Statistics Site'), ['controller' => 'CompetitionStatisticsSite', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Invitation'), ['controller' => 'Invitation', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Invitation'), ['controller' => 'Invitation', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="competition form large-9 medium-8 columns content">
    <?= $this->Form->create($competition) ?>
    <fieldset>
        <legend><?= __('Edit Competition') ?></legend>
        <?php
            echo $this->Form->control('is_active');
            echo $this->Form->control('starting_date', ['empty' => true]);
            echo $this->Form->control('finishing_date', ['empty' => true]);
            echo $this->Form->control('is_public');
            echo $this->Form->control('admin_id', ['options' => $users, 'empty' => true]);
            echo $this->Form->control('description');
            echo $this->Form->control('name');
            echo $this->Form->control('rally_id', ['options' => $rally]);
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
