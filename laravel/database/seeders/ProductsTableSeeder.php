<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'product_name' => 'Emkay Blast Apple Salt 30mg 30ml',
                'category' => 'Emkay Blast',
                'price' => 55000.00,
                'discount' => 10.0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_name' => 'Frizz Happy Sour 12mg 30ml By Emkay Brewery',
                'category' => 'Emkay Frizz',
                'price' => 40000.00,
                'discount' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_name' => 'Emkay Blast Menthol Lychee Salt 30mg 30ml',
                'category' => 'Emkay Blast',
                'price' => 55000.00,
                'discount' => 20.0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
