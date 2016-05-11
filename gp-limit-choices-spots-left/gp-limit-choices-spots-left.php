<?php
/**
 * Plugin Name: GP Limit Choices Spots Left
 * Plugin URI: http://ounceoftalent.com
 * Description: Gravity Perks: Limit Choices Display how many spots are left in the choice label when using the GP Limit Choices perk
 * Version: 0.0.1
 * Author: David Smith
 * Author URI: https://github.com/spivurno
 * License: GPL2
 */
add_filter( 'gplc_remove_choices', '__return_false' );
add_filter( 'gplc_pre_render_choice', 'my_add_how_many_left_message', 10, 4 );
function my_add_how_many_left_message( $choice, $exceeded_limit, $field, $form ) {
	$choice_counts = GWLimitChoices::get_choice_counts( $form['id'], $field );
	$count = rgar( $choice_counts, $choice['value'] ) ? rgar( $choice_counts, $choice['value'] ) : 0;
	$limit = rgar($choice, 'limit');
	$how_many_left = max( $limit - $count, 0 );
	$message = "(razpoložljivih mest: $how_many_left)";
	$choice['text'] = $choice['text'] . " $message";
	return $choice;
}