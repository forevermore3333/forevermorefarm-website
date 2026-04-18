'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'

type Category = 'all' | 'garden' | 'garden-build' | 'animals' | 'hogs' | 'goats' | 'sheep' | 'chickens' | 'rabbits' | 'land' | 'people' | 'events'

interface Photo {
  src: string
  alt: string
  category: Exclude<Category, 'all'>
}

const photos: Photo[] = [
  // Garden (~15)
  { src: '/images/garden/bouquet-of-cut-flowers.jpg', alt: 'Bouquet of cut flowers from the farm garden', category: 'garden' },
  { src: '/images/garden/bunch-of-yellow-sunflowers.jpg', alt: 'Bunch of yellow sunflowers', category: 'garden' },
  { src: '/images/garden/cherry-tomatoes-on-vine.jpg', alt: 'Cherry tomatoes ripening on the vine', category: 'garden' },
  { src: '/images/garden/bowl-of-ripe-tomatoes.jpg', alt: 'Bowl of ripe farm-fresh tomatoes', category: 'garden' },
  { src: '/images/garden/bowls-of-dried-garden-herbs.jpg', alt: 'Bowls of dried garden herbs', category: 'garden' },
  { src: '/images/garden/butternut-squash-growing-in-garden.jpg', alt: 'Butternut squash growing in the garden', category: 'garden' },
  { src: '/images/garden/tulips-along-farm-road.jpg', alt: 'Tulips lining the farm road in spring', category: 'garden' },
  { src: '/images/garden/white-lily-flower-garden.jpg', alt: 'White lily flower in the garden', category: 'garden' },
  { src: '/images/garden/yellow-ranunculus-flowers-garden.jpg', alt: 'Yellow ranunculus flowers in the garden', category: 'garden' },
  { src: '/images/garden/zinnias-sunflowers-white-tent.jpg', alt: 'Zinnias and sunflowers with the white event tent', category: 'garden' },
  { src: '/images/garden/vine-covered-garden-trellis.jpg', alt: 'Vines covering the garden trellis', category: 'garden' },
  { src: '/images/garden/cabbage-growing-in-garden-close.jpg', alt: 'Close-up of cabbage growing in the garden', category: 'garden' },
  { src: '/images/garden/bucket-tomatoes-kale-porch.jpg', alt: 'Bucket of tomatoes and kale on the porch', category: 'garden' },
  { src: '/images/garden/amaranth-plant-in-garden.jpg', alt: 'Amaranth plant growing in the garden', category: 'garden' },
  { src: '/images/garden/blueberry-bush-with-berries.jpg', alt: 'Blueberry bush heavy with berries', category: 'garden' },

  // Garden Build (~10)
  { src: '/images/garden-build/trailer-full-straw-bales-arrive.jpg', alt: 'Trailer full of straw bales arriving at the farm', category: 'garden-build' },
  { src: '/images/garden-build/garden-posts-day-1.jpg', alt: 'Garden enclosure posts going up on day one', category: 'garden-build' },
  { src: '/images/garden-build/hay-bales-in-raised-bed.jpg', alt: 'Hay bales placed in raised garden beds', category: 'garden-build' },
  { src: '/images/garden-build/concetta-placing-bales-golden-hour.jpg', alt: 'Concetta placing straw bales at golden hour', category: 'garden-build' },
  { src: '/images/garden-build/olin-concetta-working-garden.jpg', alt: 'Olin and Concetta working together in the garden', category: 'garden-build' },
  { src: '/images/garden-build/olin-family-filling-beds.jpg', alt: 'The family filling raised garden beds', category: 'garden-build' },
  { src: '/images/garden-build/metal-garden-beds-straw-filled.jpg', alt: 'Metal raised garden beds filled with straw', category: 'garden-build' },
  { src: '/images/garden-build/garden-enclosure-wide-blue-sky.jpg', alt: 'The completed garden enclosure under a blue sky', category: 'garden-build' },
  { src: '/images/garden-build/garden-pergola-interior-complete.jpg', alt: 'Interior of the completed garden pergola', category: 'garden-build' },
  { src: '/images/garden-build/garden-fence-hanging-baskets.jpg', alt: 'Garden fence with hanging flower baskets', category: 'garden-build' },

  // Animals (~20)
  { src: '/images/house-animals/clementine-sunglasses-blanket.jpg', alt: 'Clementine the Juliana pig with sunglasses on a blanket', category: 'animals' },
  { src: '/images/house-animals/clementine-running.jpg', alt: 'Clementine the Juliana pig running in the pasture', category: 'animals' },
  { src: '/images/house-animals/clementine-hazel-pasture.jpg', alt: 'Clementine and Hazel together in the pasture', category: 'animals' },
  { src: '/images/house-animals/hazel-closeup-hero.jpg', alt: 'Hazel the pot-belly pig up close', category: 'animals' },
  { src: '/images/house-animals/hazel-road-trot.jpg', alt: 'Hazel trotting down the farm road', category: 'animals' },
  { src: '/images/house-animals/hazel-teddy-dogbed-1.jpg', alt: 'Hazel and Teddy the cat sharing a dog bed', category: 'animals' },
  { src: '/images/house-animals/cat-yawning-in-garden.jpg', alt: 'Teddy the cat yawning in the garden', category: 'animals' },
  { src: '/images/house-animals/cat-hiding-in-garden.jpg', alt: 'Teddy the cat hiding among garden plants', category: 'animals' },
  { src: '/images/house-animals/pig-cat-bed-1.jpg', alt: 'Pig and cat curled up together on a bed', category: 'animals' },
  { src: '/images/house-animals/dorothy-jean-favorite.jpg', alt: 'Dorothy Jean the dog at the farm', category: 'animals' },
  { src: '/images/house-animals/juliana-pasture-4-closeup.jpg', alt: 'Juliana pig close-up in the pasture', category: 'animals' },
  { src: '/images/pigs/piglets-pile-5.jpg', alt: 'Heritage Berkshire piglets piled together', category: 'animals' },
  { src: '/images/pigs/piglets-closeup-6.jpg', alt: 'Berkshire piglets close-up', category: 'animals' },
  { src: '/images/pigs/sow-with-piglets-1.jpg', alt: 'Berkshire sow with her piglets', category: 'animals' },
  { src: '/images/pigs/sow-piglets-nuzzle-13.jpg', alt: 'Sow nuzzling her piglets in the straw', category: 'animals' },
  { src: '/images/goats/baby-nigerian-dwarf-trio.jpg', alt: 'Baby Nigerian Dwarf goat trio', category: 'animals' },
  { src: '/images/sheep/sheep-barn-solar-hero.jpg', alt: 'Katahdin sheep near the barn and solar panels', category: 'animals' },
  { src: '/images/sheep/katahdin-field-vintage-car-1.jpg', alt: 'Katahdin sheep grazing near a vintage car in the field', category: 'animals' },
  { src: '/images/sheep/sheep-stage-vw-1.jpg', alt: 'Sheep gathered near the stage and VW bus', category: 'animals' },
  { src: '/images/chickens/eggs-coop-closeup.jpg', alt: 'Fresh eggs close-up in the chicken coop', category: 'animals' },

  // The Land (~10)
  { src: '/images/pasture-land/field-of-wildflowers.jpg', alt: 'Field of wildflowers at Forevermore Farm', category: 'land' },
  { src: '/images/pasture-land/wildflowers-bee-yellow-1.jpg', alt: 'Bee on yellow wildflowers in the pasture', category: 'land' },
  { src: '/images/pasture-land/open-field-with-hay-bales.jpg', alt: 'Open field with hay bales at dusk', category: 'land' },
  { src: '/images/pasture-land/mushroom-skyward-perspective.jpg', alt: 'Mushroom viewed from below against the sky', category: 'land' },
  { src: '/images/pasture-land/tall-wildflowers-pasture-scene.jpg', alt: 'Tall wildflowers in the pasture scene', category: 'land' },
  { src: '/images/pasture-land/purple-thistle-in-pasture.jpg', alt: 'Purple thistle blooming in the pasture', category: 'land' },
  { src: '/images/property/daffodils-line-field-house.jpg', alt: 'Daffodils lining the field near the farmhouse', category: 'land' },
  { src: '/images/property/stage-sunrise-fog-valley.jpg', alt: 'Farm stage at sunrise with fog in the valley', category: 'land' },
  { src: '/images/property/farm-house-field-trees.jpg', alt: 'The farmhouse with field and trees', category: 'land' },
  { src: '/images/property/olin-tractor-brushhog-pov.jpg', alt: 'Tractor and brush hog working the farm fields', category: 'land' },

  // People (~8)
  { src: '/images/people/children-planting-garden-jugs.jpg', alt: 'Children planting seeds in recycled milk jugs', category: 'people' },
  { src: '/images/people/children-watering-garden-beds.jpg', alt: 'Children watering the raised garden beds', category: 'people' },
  { src: '/images/people/child-planting-seeds-garden-bed.jpg', alt: 'Child planting seeds in a garden bed', category: 'people' },
  { src: '/images/people/two-women-smiling-garden-project.jpg', alt: 'Two women smiling at a garden project', category: 'people' },
  { src: '/images/people/woman-holding-bouquet-of-flowers.jpg', alt: 'Woman holding a bouquet of fresh farm flowers', category: 'people' },
  { src: '/images/people/children-family-with-dog.jpg', alt: 'Children and family with the farm dog', category: 'people' },
  { src: '/images/people/planting-seeds-recycled-jugs.jpg', alt: 'Planting seeds in recycled milk jugs', category: 'people' },
  { src: '/images/garden/child-planting-with-pig-nearby.jpg', alt: 'Child planting in the garden with a pig nearby', category: 'people' },

  // Events (all 3)
  { src: '/images/events/couple-cutting-cake-flowers.jpg', alt: 'Couple cutting cake surrounded by flowers at a farm event', category: 'events' },
  { src: '/images/events/white-lily-event-tent.jpg', alt: 'White lily flowers at the event tent', category: 'events' },
  { src: '/images/events/white-tent-and-flowers.jpg', alt: 'White event tent and flowers at Forevermore Farm', category: 'events' },

  // ============================================================
  // NEW PHOTOS - 442 photos added from iCloud archive 2026-03-24
  // ============================================================

  // === Garden (flowers, produce, herbs, bulbs) ===
  { src: '/images/garden/green-leaf-lettuce-raised-bed-garden.jpg', alt: 'Fresh green leaf lettuce growing in wooden raised bed with red chard at Tennessee homestead garden', category: 'garden' },
  { src: '/images/garden/harvested-lisianthus-queen-annes-lace-bouquet.jpg', alt: 'Freshly harvested green and white lisianthus flowers with Queen Anne\'s lace from Tennessee flower farm', category: 'garden' },
  { src: '/images/garden/orange-yellow-gladiolus-fresh-cut-stems.jpg', alt: 'Vibrant orange and yellow bi-color gladiolus flower stems freshly cut from farm garden', category: 'garden' },
  { src: '/images/garden/yellow-sunflower-bouquet-fresh-harvest.jpg', alt: 'Bright yellow sunflower bouquet freshly harvested from Tennessee homestead flower garden', category: 'garden' },
  { src: '/images/garden/hydrangea-plant-green-buds-forming.jpg', alt: 'Green hydrangea plant with developing flower buds in farmhouse garden bed', category: 'garden' },
  { src: '/images/pasture-land/wildflower-meadow-queen-annes-lace-pasture.jpg', alt: 'Wildflower meadow with white Queen Anne\'s lace blooming in Tennessee pasture', category: 'land' },
  { src: '/images/garden/pale-yellow-ranunculus-spring-blooms.jpg', alt: 'Pale yellow ranunculus flowers blooming with orange ranunculus in background in spring cutting garden', category: 'garden' },
  { src: '/images/garden/yellow-ranunculus-picket-fence-cottage-garden.jpg', alt: 'Cream yellow ranunculus flowers growing along wooden picket fence in farmhouse cottage garden', category: 'garden' },
  { src: '/images/garden/hot-pink-ranunculus-dewy-spring-blooms.jpg', alt: 'Hot pink ranunculus flowers with water droplets blooming in Tennessee homestead spring garden', category: 'garden' },
  { src: '/images/garden/red-burgundy-tulips-spring-flower-row.jpg', alt: 'Red and burgundy tulips blooming in spring flower row at Tennessee family farm', category: 'garden' },
  { src: '/images/garden/colorful-tulip-row-spring-garden-driveway.jpg', alt: 'Colorful spring tulip garden row with pink magenta red and yellow blooms along farm driveway', category: 'garden' },
  { src: '/images/garden/mixed-ranunculus-flower-bed-full-bloom.jpg', alt: 'Mixed ranunculus flower bed in full bloom with red orange purple yellow and white flowers in spring garden', category: 'garden' },
  { src: '/images/house-animals/farm-cat-hiding-daffodil-foliage.jpg', alt: 'Farm cat hiding among green daffodil foliage in flower garden on Tennessee homestead', category: 'animals' },
  { src: '/images/house-animals/farm-cat-yawning-daffodil-garden.jpg', alt: 'Tabby and white farm cat yawning while lounging in daffodil plants in sunny garden', category: 'animals' },
  { src: '/images/house-animals/farm-cat-napping-spring-flower-bed.jpg', alt: 'Gray and white farm cat napping peacefully among daffodil leaves in spring flower bed', category: 'animals' },
  { src: '/images/house-animals/farm-cat-closeup-peeking-through-plants.jpg', alt: 'Close up of gray and white tabby farm cat peeking through daffodil foliage with green eyes', category: 'animals' },
  { src: '/images/garden/straw-bale-garden-squash-brassicas-fenced-row.jpg', alt: 'Straw bale garden row with young squash plants and brassicas growing along wire fence at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/collard-greens-straw-bale-garden.jpg', alt: 'Healthy collard greens with large blue-green leaves growing in straw bale garden bed', category: 'garden' },
  { src: '/images/garden/collard-greens-thriving-straw-bale.jpg', alt: 'Lush collard green plants thriving in straw bale garden with wire fencing in background', category: 'garden' },
  { src: '/images/garden/cauliflower-head-forming-garden.jpg', alt: 'Young white cauliflower head forming among protective green leaves in farm garden', category: 'garden' },
  { src: '/images/garden/cabbage-row-healthy-leaves.jpg', alt: 'Row of healthy cabbage plants with large blue-green leaves in homestead garden', category: 'garden' },
  { src: '/images/garden/cabbage-heads-forming-straw-mulch.jpg', alt: 'Green cabbage plants forming heads in straw mulched garden bed', category: 'garden' },
  { src: '/images/garden/curly-kale-abundant-straw-mulch.jpg', alt: 'Curly green kale plants growing abundantly in Tennessee farm garden with straw mulch', category: 'garden' },
  { src: '/images/garden/cauliflower-mature-harvest-ready.jpg', alt: 'Large mature white cauliflower head ready for harvest with gloved hand for scale', category: 'garden' },
  { src: '/images/garden/cauliflower-inspection-farm-garden.jpg', alt: 'Fresh white cauliflower head being inspected by gloved hand in farm garden', category: 'garden' },
  { src: '/images/garden/cabbage-head-dew-drops-morning.jpg', alt: 'Green cabbage head with morning dew drops on leaves in homestead garden', category: 'garden' },
  { src: '/images/garden/lacinato-dinosaur-kale-straw-bale.jpg', alt: 'Lacinato dinosaur kale with dark textured leaves growing tall in straw bale garden', category: 'garden' },
  { src: '/images/garden/tomato-plants-straw-bale-garden-dusk.jpg', alt: 'Tomato plants and mixed vegetables growing in straw bale garden row at dusk', category: 'garden' },
  { src: '/images/garden/tomato-vegetable-row-straw-bale-fenced.jpg', alt: 'Row of tomato and vegetable plants in straw bale garden with farm fencing', category: 'garden' },
  { src: '/images/garden/tomato-yellow-blossom-green-fruit.jpg', alt: 'Yellow tomato blossom with small green tomatoes forming on vine in farm garden', category: 'garden' },
  { src: '/images/garden/tuscan-kale-water-droplets-straw.jpg', alt: 'Tuscan lacinato kale plant with water droplets on bumpy dark green leaves in straw mulch', category: 'garden' },
  { src: '/images/garden/cabbage-tight-head-water-droplets.jpg', alt: 'Green cabbage forming tight head with water droplets on spiral leaves', category: 'garden' },
  { src: '/images/garden/cabbage-developing-head-rain-drops.jpg', alt: 'Cabbage plant with developing head and rain drops on large outer leaves', category: 'garden' },
  { src: '/images/garden/blueberry-bush-unripe-green-berries.jpg', alt: 'Blueberry bush with unripe green berries developing in homestead garden', category: 'garden' },
  { src: '/images/garden/squash-vine-leaves-straw-bale.jpg', alt: 'Squash or cucumber vine with large green leaves growing in straw bale garden', category: 'garden' },
  { src: '/images/garden/pink-peony-bloom-farmhouse-garden.jpg', alt: 'Pink peony flower beginning to bloom in farmhouse garden with brick wall background', category: 'garden' },
  { src: '/images/pasture-land/purple-thistle-wildflower-blooming-pasture.jpg', alt: 'Purple thistle wildflower in full bloom with unopened bud in Tennessee farm pasture', category: 'land' },
  { src: '/images/pasture-land/purple-thistle-wildflower-meadow-tennessee.jpg', alt: 'Tall purple thistle flowers growing in wildflower meadow with yellow wildflowers and pine trees', category: 'land' },
  { src: '/images/pasture-land/gravel-driveway-through-farm-pastures.jpg', alt: 'Winding gravel driveway through green pastures with pine trees and wildflowers at Tennessee family farm', category: 'land' },
  { src: '/images/garden/colorful-asiatic-lilies-flower-bed.jpg', alt: 'Colorful Asiatic lilies in orange yellow pink and white blooming in mulched flower bed', category: 'garden' },
  { src: '/images/garden/mixed-asiatic-lily-garden-blooming.jpg', alt: 'Mixed Asiatic lily garden with orange yellow and cream colored blooms in bark mulch bed', category: 'garden' },
  { src: '/images/garden/pink-gladiolus-flowers-garden-bed.jpg', alt: 'Bright pink gladiolus flowers blooming in black mulch garden bed', category: 'garden' },
  { src: '/images/garden/magenta-gladiolus-blooms-closeup.jpg', alt: 'Vibrant magenta gladiolus blooms with deep pink centers in mulched flower garden', category: 'garden' },
  { src: '/images/garden/white-cauliflower-head-growing-garden.jpg', alt: 'Fresh white cauliflower head growing in vegetable garden with large green leaves', category: 'garden' },
  { src: '/images/garden/harvesting-cauliflower-farm-garden.jpg', alt: 'Gloved hand harvesting large cauliflower head from farm vegetable garden', category: 'garden' },
  { src: '/images/garden/cucumber-growing-straw-bale-garden.jpg', alt: 'Green cucumber growing on vine with yellow blossoms in straw bale garden', category: 'garden' },
  { src: '/images/garden/cucumbers-ripening-straw-bale-garden.jpg', alt: 'Multiple cucumbers ripening on vines in straw bale vegetable garden', category: 'garden' },
  { src: '/images/garden/green-roma-tomatoes-straw-bale-garden.jpg', alt: 'Green roma tomatoes growing in clusters on vine in straw bale garden', category: 'garden' },
  { src: '/images/garden/green-bell-peppers-straw-bale-garden.jpg', alt: 'Green bell peppers growing on plant in straw bale vegetable garden', category: 'garden' },
  { src: '/images/garden/banana-peppers-growing-straw-bale-garden.jpg', alt: 'Banana peppers growing on plant in straw bale garden with cabbage in background', category: 'garden' },
  { src: '/images/garden/green-cabbage-head-morning-dew.jpg', alt: 'Fresh green cabbage head with morning dew ready for harvest in farm garden', category: 'garden' },
  { src: '/images/garden/lacinato-dinosaur-kale-straw-bale-garden.jpg', alt: 'Lacinato dinosaur kale plants with dark blue-green textured leaves in straw bale garden', category: 'garden' },
  { src: '/images/garden/curly-kale-row-straw-bale-garden.jpg', alt: 'Lush curly green kale row growing in straw bale garden with trellis', category: 'garden' },
  { src: '/images/garden/cucumber-vines-trellis-straw-bale-garden.jpg', alt: 'Cucumber vines climbing trellis with yellow flowers in straw bale vegetable garden', category: 'garden' },
  { src: '/images/garden/sweet-potato-slips-straw-bale-row.jpg', alt: 'Sweet potato slips growing in row of straw bales in homestead garden', category: 'garden' },
  { src: '/images/garden/freshly-harvested-homegrown-cucumbers.jpg', alt: 'Hand holding freshly harvested homegrown cucumbers from farm garden', category: 'garden' },
  { src: '/images/garden/purple-white-bicolor-gladiolus-bloom.jpg', alt: 'Purple and white bicolor gladiolus flower spike blooming in Tennessee farm flower garden', category: 'garden' },
  { src: '/images/garden/red-gladiolus-flower-bed-rows.jpg', alt: 'Bright red gladiolus flowers blooming in weed barrier fabric flower bed on family homestead', category: 'garden' },
  { src: '/images/garden/red-orange-gladiolus-cut-flower-garden.jpg', alt: 'Red and orange gladiolus blooms in cut flower garden with purple gladiolus in background', category: 'garden' },
  { src: '/images/garden/vibrant-red-gladiolus-homestead-garden.jpg', alt: 'Vibrant red gladiolus flowers growing in organized flower rows at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/chartreuse-lisianthus-blooms-flower-bed.jpg', alt: 'Chartreuse green lisianthus flowers blooming in cut flower garden with weed barrier', category: 'garden' },
  { src: '/images/garden/lime-green-lisianthus-buds-blooming.jpg', alt: 'Lime green lisianthus flowers with multiple buds growing in Tennessee flower farm', category: 'garden' },
  { src: '/images/garden/cream-white-lisianthus-closeup.jpg', alt: 'Cream white lisianthus flower closeup with ruffled petals in homestead cut flower garden', category: 'garden' },
  { src: '/images/garden/yellow-lisianthus-rows-budding.jpg', alt: 'Rows of yellow and green lisianthus flowers budding in weed barrier fabric garden bed', category: 'garden' },
  { src: '/images/garden/lavender-burgundy-gladiolus-pasture-view.jpg', alt: 'Lavender and burgundy bicolor gladiolus flower spike with blurred green pasture background', category: 'garden' },
  { src: '/images/garden/purple-cream-gladiolus-burgundy-centers.jpg', alt: 'Purple and cream gladiolus flowers with dark burgundy centers blooming at family farm', category: 'garden' },
  { src: '/images/garden/mixed-gladiolus-bed-garden-enclosure.jpg', alt: 'Mixed gladiolus flower bed with red and purple blooms and wooden garden enclosure in background', category: 'garden' },
  { src: '/images/garden/colorful-gladiolus-rows-straw-bale-garden.jpg', alt: 'Colorful gladiolus rows with purple and red flowers growing near straw bale garden fence', category: 'garden' },
  { src: '/images/garden/farm-fresh-flower-arrangement-gladiolus-sunflowers.jpg', alt: 'Farm fresh flower arrangement with gladiolus sunflowers lisianthus and poppies in green vase', category: 'garden' },
  { src: '/images/garden/fresh-harvested-green-cabbage-head.jpg', alt: 'Hand holding freshly harvested green cabbage head from Tennessee homestead vegetable garden', category: 'garden' },
  { src: '/images/garden/cherry-tomatoes-ripening-straw-bale-garden.jpg', alt: 'Cherry tomatoes ripening on vine in straw bale garden bed at family homestead', category: 'garden' },
  { src: '/images/garden/paste-tomatoes-ripening-straw-bale.jpg', alt: 'San Marzano style paste tomatoes ripening on vine in Tennessee straw bale vegetable garden', category: 'garden' },
  { src: '/images/garden/ripe-cherry-tomato-cluster-vine.jpg', alt: 'Cluster of ripe red cherry tomatoes on healthy vine in homestead straw bale garden', category: 'garden' },
  { src: '/images/garden/abundant-tomato-plants-fenced-straw-bale.jpg', alt: 'Abundant tomato plants with mixed ripening fruit in fenced straw bale garden with kale', category: 'garden' },
  { src: '/images/garden/red-cherry-tomato-cluster-harvest-ready.jpg', alt: 'Perfect cluster of bright red cherry tomatoes ready for harvest in straw bale garden', category: 'garden' },
  { src: '/images/garden/hand-picked-cherry-tomatoes-straw-bale.jpg', alt: 'Hand holding freshly picked red cherry tomatoes from Tennessee homestead straw bale garden', category: 'garden' },
  { src: '/images/garden/fresh-picked-cherry-tomatoes-on-vine.jpg', alt: 'Hand holding cluster of ripe red cherry tomatoes on the vine in Tennessee farm garden', category: 'garden' },
  { src: '/images/garden/white-oriental-lily-blooming-garden.jpg', alt: 'White oriental lily with pink speckles blooming in mulched flower bed at family homestead', category: 'garden' },
  { src: '/images/garden/fresh-cherry-tomato-harvest-bowl.jpg', alt: 'White bowl filled with freshly harvested red and yellow cherry tomatoes from straw bale garden', category: 'garden' },
  { src: '/images/garden/cucumber-harvest-straw-bale-garden.jpg', alt: 'Pile of fresh green cucumbers harvested from straw bale garden with vines in background', category: 'garden' },
  { src: '/images/garden/brussels-sprouts-growing-on-stalk.jpg', alt: 'Close-up of Brussels sprouts forming on thick green stalk in vegetable garden', category: 'garden' },
  { src: '/images/garden/heirloom-tomatoes-ripening-on-vine.jpg', alt: 'Green and yellow heirloom tomatoes ripening on vine in straw bale garden bed', category: 'garden' },
  { src: '/images/garden/purple-bell-peppers-on-plant.jpg', alt: 'Deep purple bell peppers growing on plant in Tennessee vegetable garden', category: 'garden' },
  { src: '/images/garden/curly-kale-plants-garden-row.jpg', alt: 'Lush curly kale plants growing in rows in fenced vegetable garden', category: 'garden' },
  { src: '/images/garden/sweet-potato-vines-straw-bale-garden.jpg', alt: 'Sweet potato vines growing vigorously in straw bale garden bed with fence in background', category: 'garden' },
  { src: '/images/garden/tomato-plants-flowering-straw-bale.jpg', alt: 'Tomato plants with yellow blossoms growing in decomposing straw bale garden beds', category: 'garden' },
  { src: '/images/garden/tomato-plants-blooming-straw-bale-garden.jpg', alt: 'Tomato plants in full bloom growing in straw bale garden system', category: 'garden' },
  { src: '/images/garden/potato-plants-straw-bale-garden.jpg', alt: 'Potato plants growing alongside tomatoes in straw bale garden system', category: 'garden' },
  { src: '/images/garden/ripe-blueberries-on-bush.jpg', alt: 'Ripe blueberries on bush ready for picking in farm garden', category: 'garden' },
  { src: '/images/garden/cucumber-vine-climbing-trellis.jpg', alt: 'Cucumber vine tendril climbing wire fence trellis in vegetable garden', category: 'garden' },
  { src: '/images/garden/fig-tree-leaves-developing-fruit.jpg', alt: 'Young fig tree with large lobed green leaves and developing fruit', category: 'garden' },
  { src: '/images/pasture-land/purple-liatris-wildflower-pasture.jpg', alt: 'Purple blazing star liatris wildflower blooming in Tennessee pasture', category: 'land' },
  { src: '/images/pasture-land/blazing-star-liatris-native-wildflower.jpg', alt: 'Purple blazing star liatris wildflower spike in native Tennessee grassland', category: 'land' },
  { src: '/images/garden/fresh-cut-sunflower-bouquet.jpg', alt: 'Fresh cut yellow sunflower bouquet lying on gravel driveway at farm', category: 'garden' },
  { src: '/images/garden/yellow-sunflowers-farm-harvest.jpg', alt: 'Bright yellow sunflower bunch harvested from farm garden overhead view', category: 'garden' },
  { src: '/images/garden/orange-yellow-gladiolus-cut-flowers.jpg', alt: 'Orange and yellow bicolor gladiolus flower stems freshly cut from garden', category: 'garden' },
  { src: '/images/garden/orange-yellow-bicolor-gladiolus-harvest.jpg', alt: 'Vibrant orange and yellow bicolor gladiolus flowers freshly harvested from Tennessee homestead garden', category: 'garden' },
  { src: '/images/garden/green-cream-lisianthus-queens-anne-lace-bouquet.jpg', alt: 'Fresh cut green and cream lisianthus flowers with Queen Anne\'s lace from farm flower garden', category: 'garden' },
  { src: '/images/garden/white-yellow-lisianthus-queens-anne-lace-closeup.jpg', alt: 'White and pale yellow lisianthus blooms with green buds and Queen Anne\'s lace cut flowers', category: 'garden' },
  { src: '/images/garden/green-foxtail-millet-ornamental-grass-bundle.jpg', alt: 'Fresh harvested green foxtail millet ornamental grass stems for flower arranging', category: 'garden' },
  { src: '/images/garden/setaria-foxtail-grass-harvest-bundle.jpg', alt: 'Bundle of green setaria foxtail grass harvested for rustic flower arrangements', category: 'garden' },
  { src: '/images/garden/green-flax-seed-pods-stems-harvest.jpg', alt: 'Fresh cut green flax seed pods on stems for dried flower arrangements', category: 'garden' },
  { src: '/images/garden/flax-stems-seed-pods-yellow-flowers.jpg', alt: 'Harvested flax plant stems with delicate seed pods and small yellow flowers', category: 'garden' },
  { src: '/images/garden/summer-flower-bouquets-mason-jars-row.jpg', alt: 'Row of farm fresh summer flower bouquets in mason jars with sunflowers gladiolus and lisianthus', category: 'garden' },
  { src: '/images/garden/summer-wildflower-bouquet-gladiolus-sunflowers-crystal-vase.jpg', alt: 'Summer wildflower bouquet with orange gladiolus yellow sunflowers and green lisianthus in crystal vase', category: 'garden' },
  { src: '/images/garden/farm-flower-arrangements-line-gravel-path.jpg', alt: 'Line of colorful farm flower arrangements with sunflowers gladiolus and foxtail grass on gravel path', category: 'garden' },
  { src: '/images/garden/rustic-summer-bouquet-wire-basket-vase.jpg', alt: 'Rustic summer bouquet with sunflowers orange gladiolus cream lisianthus and Queen Anne\'s lace in wire basket vase', category: 'garden' },
  { src: '/images/garden/overhead-summer-flower-arrangement-gladiolus-lisianthus.jpg', alt: 'Overhead view of summer flower arrangement with gladiolus lisianthus and Queen Anne\'s lace', category: 'garden' },
  { src: '/images/garden/summer-bouquet-closeup-sunflower-lisianthus-gladiolus.jpg', alt: 'Close-up summer bouquet with yellow sunflower green lisianthus orange gladiolus and foxtail grass', category: 'garden' },
  { src: '/images/people/farmer-utv-summer-flower-bouquets-delivery.jpg', alt: 'Farmer smiling in utility vehicle with box of fresh cut summer flower bouquets at Tennessee homestead', category: 'people' },
  { src: '/images/events/bride-groom-wildflower-bouquet-rustic-wedding.jpg', alt: 'Bride and groom portrait with farm fresh wildflower bouquet at rustic Tennessee wedding venue', category: 'events' },
  { src: '/images/events/couple-cutting-cake-farm-flower-centerpiece-reception.jpg', alt: 'Newlywed couple cutting wedding cake with farm flower centerpiece at outdoor reception', category: 'events' },
  { src: '/images/garden/tomato-kale-harvest-blue-bucket-barn-view.jpg', alt: 'Fresh garden harvest of red tomatoes and curly kale in blue bucket with red barn and solar panels', category: 'garden' },
  { src: '/images/garden/tomato-kale-harvest-farmhouse-porch.jpg', alt: 'Homegrown tomatoes and fresh kale harvest displayed on farmhouse porch', category: 'garden' },
  { src: '/images/garden/fresh-tomatoes-kale-closeup-garden-harvest.jpg', alt: 'Close-up of fresh picked red tomatoes and green curly kale from straw bale garden', category: 'garden' },
  { src: '/images/garden/sedum-autumn-joy-foundation-planting.jpg', alt: 'Sedum plants with green succulent leaves and emerging flower buds growing along brick house foundation', category: 'garden' },
  { src: '/images/garden/sedum-autumn-joy-green-buds-foundation-garden.jpg', alt: 'Sedum autumn joy plants with green flower buds growing in farmhouse foundation garden bed', category: 'garden' },
  { src: '/images/garden/sedum-stonecrop-flower-buds-closeup.jpg', alt: 'Close-up of sedum stonecrop with thick blue-green leaves and clustered flower buds in farmhouse garden bed', category: 'garden' },
  { src: '/images/garden/white-oriental-lily-pink-stamens-blooming.jpg', alt: 'White oriental lily with pink stamens blooming in farm flower garden with unopened buds', category: 'garden' },
  { src: '/images/garden/bicolor-pink-cream-asiatic-lilies.jpg', alt: 'Pink and cream bicolor Asiatic lilies with burgundy centers blooming in Tennessee farm garden', category: 'garden' },
  { src: '/images/garden/white-lisianthus-ruffled-blooms.jpg', alt: 'White lisianthus flowers with delicate ruffled petals and green buds growing in farm flower field', category: 'garden' },
  { src: '/images/garden/white-double-lisianthus-rose-like.jpg', alt: 'White double lisianthus flowers resembling roses with yellow centers in homestead cutting garden', category: 'garden' },
  { src: '/images/garden/yellow-double-lisianthus-harvest.jpg', alt: 'Yellow double lisianthus flowers with ruffled petals freshly harvested in bucket from farm flower garden', category: 'garden' },
  { src: '/images/garden/grapevine-heart-shaped-leaves-trellis.jpg', alt: 'Young grapevine with heart-shaped leaves growing on trellis in Tennessee homestead garden', category: 'garden' },
  { src: '/images/garden/grapevine-blackberry-foliage-dew.jpg', alt: 'Mixed foliage of grapevine and blackberry plants with morning dew in farm garden', category: 'garden' },
  { src: '/images/garden/sweet-potato-vines-straw-bale-garden-2.jpg', alt: 'Sweet potato vines with lush green heart-shaped leaves spreading in straw bale garden bed', category: 'garden' },
  { src: '/images/garden/sweet-potato-plants-straw-mulch-bed.jpg', alt: 'Thriving sweet potato plants with dense foliage growing in straw mulched raised bed at family homestead', category: 'garden' },
  { src: '/images/garden/sweet-potato-vines-fenced-garden.jpg', alt: 'Sweet potato vines growing vigorously in fenced vegetable garden with straw mulch at Lyles Tennessee farm', category: 'garden' },
  { src: '/images/garden/tomato-plant-yellow-flowers-green-fruit.jpg', alt: 'Tomato plant with yellow flowers and small green tomatoes developing on vine in straw bale garden', category: 'garden' },
  { src: '/images/pasture-land/fairy-ring-mushrooms-pasture-lawn.jpg', alt: 'Fairy ring of white parasol mushrooms forming circle pattern in green pasture lawn at Tennessee homestead', category: 'land' },
  { src: '/images/pasture-land/white-parasol-mushrooms-dewy-grass-closeup.jpg', alt: 'Close-up of white parasol mushrooms with textured caps growing in dewy farm grass', category: 'land' },
  { src: '/images/pasture-land/parasol-mushroom-morning-dew-pine-backdrop.jpg', alt: 'Single parasol mushroom with scaly cap and ring on stem in morning dew with pine trees in background', category: 'land' },
  { src: '/images/pasture-land/parasol-mushroom-gills-identification.jpg', alt: 'Hand holding parasol mushroom showing brown gills and ring detail for identification at Tennessee farm', category: 'land' },
  { src: '/images/garden/ripe-red-cherry-tomatoes-vine.jpg', alt: 'Ripe red cherry tomatoes on vine ready for harvest in homestead straw bale garden', category: 'garden' },
  { src: '/images/garden/orange-sweet-peppers-ripening-straw-mulch.jpg', alt: 'Orange sweet peppers ripening on plant with straw mulch in Tennessee farm vegetable garden', category: 'garden' },
  { src: '/images/garden/green-anaheim-chile-peppers-growing.jpg', alt: 'Green Anaheim chile peppers growing on plant with orange peppers in background in homestead garden', category: 'garden' },
  { src: '/images/garden/orange-peppers-ripening-straw-bale-garden.jpg', alt: 'Ripe orange peppers growing on plant with straw mulch in Tennessee homestead garden', category: 'garden' },
  { src: '/images/garden/jalapeno-peppers-straw-bale-garden.jpg', alt: 'Green and purple jalapeno peppers on plant in straw bale garden with cabbage in background', category: 'garden' },
  { src: '/images/garden/cucumbers-growing-wire-trellis.jpg', alt: 'Fresh cucumbers growing on vine with wire trellis support in homestead garden', category: 'garden' },
  { src: '/images/garden/squash-vines-climbing-trellis.jpg', alt: 'Squash and melon vines climbing wire panel trellis in straw bale garden', category: 'garden' },
  { src: '/images/garden/vine-tendrils-cattle-panel-trellis.jpg', alt: 'Cucumber or melon vines with tendrils growing on cattle panel trellis', category: 'garden' },
  { src: '/images/garden/white-shaggy-mane-mushrooms-straw-bale.jpg', alt: 'White shaggy mane mushrooms growing in cluster at base of straw bale garden', category: 'garden' },
  { src: '/images/garden/white-parasol-mushrooms-closeup-straw.jpg', alt: 'Close-up of white parasol mushrooms with textured caps growing from straw mulch', category: 'garden' },
  { src: '/images/garden/spaghetti-squash-growing-pasture.jpg', alt: 'Young spaghetti squash hanging from vine in garden', category: 'garden' },
  { src: '/images/garden/fresh-sage-plant-silvery-leaves.jpg', alt: 'Fresh sage herb plant with silvery green fuzzy leaves growing in garden', category: 'garden' },
  { src: '/images/garden/sage-leaves-harvest-ready.jpg', alt: 'Abundant fresh sage leaves ready for harvest from homestead herb garden', category: 'garden' },
  { src: '/images/garden/fresh-rosemary-sprigs-harvest.jpg', alt: 'Handful of fresh rosemary sprigs harvested from Tennessee homestead garden', category: 'garden' },
  { src: '/images/garden/rosemary-sprigs-drying-tray.jpg', alt: 'Fresh rosemary sprigs arranged on metal tray for drying', category: 'garden' },
  { src: '/images/garden/sage-rosemary-harvest-trays.jpg', alt: 'Harvested fresh sage and rosemary herbs on metal trays for preservation', category: 'garden' },
  { src: '/images/garden/hand-holding-rosemary-harvest.jpg', alt: 'Hand holding fresh rosemary sprigs over tray of harvested herbs', category: 'garden' },
  { src: '/images/garden/fresh-sage-leaves-closeup.jpg', alt: 'Fresh harvested sage leaves with soft fuzzy texture ready for drying', category: 'garden' },
  { src: '/images/garden/rosemary-leaves-spread-drying.jpg', alt: 'Fresh rosemary leaves spread on tray for oven drying preservation', category: 'garden' },
  { src: '/images/garden/herbs-drying-oven-rosemary-sage.jpg', alt: 'Rosemary and sage herbs drying on metal trays in oven for preservation', category: 'garden' },
  { src: '/images/garden/rosemary-sage-oven-dehydrating.jpg', alt: 'Trays of homegrown rosemary and sage herbs dehydrating in oven', category: 'garden' },
  { src: '/images/pasture-land/white-boneset-wildflowers-pasture.jpg', alt: 'White boneset wildflowers blooming in Tennessee pasture meadow', category: 'land' },
  { src: '/images/pasture-land/boneset-flower-clusters-meadow.jpg', alt: 'Clusters of white boneset flowers in wildflower meadow at Lyles Tennessee homestead', category: 'land' },
  { src: '/images/pasture-land/boneset-wildflowers-tennessee-pasture.jpg', alt: 'White boneset wildflowers blooming in Tennessee pasture with native grasses and pollinators', category: 'land' },
  { src: '/images/pasture-land/obedient-plant-lavender-blooms-pasture.jpg', alt: 'Obedient plant with pale lavender blooms growing in wildflower pasture at Lyles TN homestead', category: 'land' },
  { src: '/images/pasture-land/obedient-plant-closeup-wildflower-meadow.jpg', alt: 'Close-up of obedient plant physostegia with tubular flowers in Tennessee wildflower meadow', category: 'land' },
  { src: '/images/garden/fresh-herb-cutting-wooden-deck.jpg', alt: 'Freshly harvested herb cutting with serrated leaves on wooden deck surface', category: 'garden' },
  { src: '/images/garden/native-plant-specimen-compound-leaves.jpg', alt: 'Native plant specimen with compound leaves displayed on farm deck for identification', category: 'garden' },
  { src: '/images/garden/boneset-flower-seed-head-hand.jpg', alt: 'Hand holding white boneset flower cluster going to seed on homestead deck', category: 'garden' },
  { src: '/images/garden/boneset-fluffy-seed-heads-closeup.jpg', alt: 'Late summer boneset wildflower with fluffy white seed heads held for close examination', category: 'garden' },
  { src: '/images/garden/fresh-mugwort-leaves-white-bowl.jpg', alt: 'Fresh mugwort leaves harvested in white ceramic bowl for herbal preparations', category: 'garden' },
  { src: '/images/garden/dried-herbs-mugwort-sage-rosemary-bowls.jpg', alt: 'Three bowls of dried herbs featuring mugwort sage and rosemary from homestead garden', category: 'garden' },
  { src: '/images/garden/culinary-herbs-dried-fresh-closeup.jpg', alt: 'Closeup of dried culinary herbs in white bowls with fresh mugwort sage and rosemary', category: 'garden' },
  { src: '/images/garden/red-shishito-peppers-straw-bale-garden.jpg', alt: 'Ripe red shishito peppers growing in straw bale garden with green foliage', category: 'garden' },
  { src: '/images/garden/jalapeno-peppers-blue-sky-view.jpg', alt: 'Green jalapeno peppers on plant viewed from below against blue sky in straw bale garden', category: 'garden' },
  { src: '/images/garden/jalapeno-plant-abundant-green-peppers.jpg', alt: 'Abundant jalapeno pepper plant with multiple green peppers ripening against cloudy sky', category: 'garden' },
  { src: '/images/garden/jalapeno-peppers-straw-bale-bed.jpg', alt: 'Healthy green jalapeno peppers growing in straw bale garden bed at Tennessee homestead', category: 'garden' },
  { src: '/images/pasture-land/bee-pollinating-goldenrod-fall.jpg', alt: 'Bee pollinating bright yellow goldenrod wildflowers in Tennessee fall pasture', category: 'land' },
  { src: '/images/pasture-land/goldenrod-yellow-plumes-autumn-meadow.jpg', alt: 'Goldenrod plant with yellow flower plumes and native foliage in autumn meadow', category: 'land' },
  { src: '/images/pasture-land/wild-goldenrod-patch-wooded-edge.jpg', alt: 'Wild goldenrod patch blooming yellow along wooded edge of Tennessee homestead property', category: 'land' },
  { src: '/images/pasture-land/goldenrod-wildflowers-blooming-pasture.jpg', alt: 'Yellow goldenrod wildflowers blooming in Tennessee pasture at family homestead', category: 'land' },
  { src: '/images/garden/goldenrod-drying-trays-herbal-harvest.jpg', alt: 'Fresh goldenrod flowers and leaves on drying trays for herbal tea preparation', category: 'garden' },
  { src: '/images/garden/goldenrod-flowers-leaves-drying-racks.jpg', alt: 'Goldenrod yellow flowers and green leaves separated on metal drying racks', category: 'garden' },
  { src: '/images/garden/dried-goldenrod-oven-trays-preservation.jpg', alt: 'Dried goldenrod flowers and leaves on oven trays for herbal preservation', category: 'garden' },
  { src: '/images/garden/goldenrod-fresh-dried-bowls-herbal-tea.jpg', alt: 'Fresh and dried goldenrod flowers with leaves in white bowls for herbal tea making', category: 'garden' },
  { src: '/images/garden/goldenrod-dried-flowers-fresh-stems-display.jpg', alt: 'Dried goldenrod flowers and fresh stems with leaves displayed for herbal crafting', category: 'garden' },
  { src: '/images/pasture-land/boneset-wildflower-buds-pre-bloom.jpg', alt: 'Late boneset wildflower buds before blooming harvested from Tennessee pasture', category: 'land' },
  { src: '/images/pasture-land/boneset-white-flowers-blooming-stem.jpg', alt: 'White boneset flowers blooming on stem foraged from wildflower pasture', category: 'land' },
  { src: '/images/garden/boneset-harvest-bowl-herbal-preparation.jpg', alt: 'Freshly harvested boneset flowers and leaves in white bowl for herbal preparation', category: 'garden' },
  { src: '/images/garden/boneset-flowers-leaves-bowls-drying.jpg', alt: 'White boneset flowers and green leaves separated in bowls for drying and herbal use', category: 'garden' },
  { src: '/images/garden/drying-herbs-boneset-greens-oven-trays.jpg', alt: 'Fresh herbs drying on baking sheets in oven - boneset flowers and leafy greens being preserved', category: 'garden' },
  { src: '/images/garden/dried-boneset-herb-leaves-preservation.jpg', alt: 'Dried boneset flowers and herb leaves on metal baking sheets ready for herbal preservation', category: 'garden' },
  { src: '/images/garden/dried-boneset-herbs-white-bowls.jpg', alt: 'Dried boneset wildflowers and herb leaves in white ceramic bowls for herbal tea preparation', category: 'garden' },
  { src: '/images/garden/boneset-dried-herbs-ceramic-bowls-closeup.jpg', alt: 'Harvested boneset flowers and dried herb leaves displayed in farmhouse ceramic dishes', category: 'garden' },
  { src: '/images/garden/dried-goldenrod-flower-stems.jpg', alt: 'Two dried goldenrod flower stems on white surface ready for herbal crafting', category: 'garden' },
  { src: '/images/garden/yellow-tulips-spring-garden-bed.jpg', alt: 'Bright yellow tulips blooming in spring garden bed with mulch at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/pink-yellow-tulips-redbud-trees.jpg', alt: 'Pink and yellow tulips blooming in mulched flower bed with blooming redbud trees in background', category: 'garden' },
  { src: '/images/garden/red-tulips-buds-spring-garden.jpg', alt: 'Red tulips opening with buds in spring garden bed with blooming redbud tree backdrop', category: 'garden' },
  { src: '/images/garden/red-tulips-cloudy-sky-redbud.jpg', alt: 'Red tulip blooms and buds against cloudy spring sky with redbud trees at Tennessee farm', category: 'garden' },
  { src: '/images/garden/mixed-tulip-garden-spring-homestead.jpg', alt: 'Mixed tulip garden with yellow pink and green buds in mulched bed at family homestead', category: 'garden' },
  { src: '/images/garden/spring-tulips-yellow-pink-garden-bed.jpg', alt: 'Yellow and pink tulips blooming in spring garden bed with pine trees in background at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/spring-tulips-emerging-mulched-garden.jpg', alt: 'Colorful spring tulip garden with yellow and pink blooms emerging from mulched bed on family farm', category: 'garden' },
  { src: '/images/garden/tulip-garden-birdbath-spring-blooms.jpg', alt: 'Pink yellow and red tulips in full bloom around birdbath in cottage garden', category: 'garden' },
  { src: '/images/pasture-land/old-spot-pigs-grazing-autumn-pasture.jpg', alt: 'Old Spot pigs grazing in open pasture with autumn treeline at Lyles Tennessee family farm', category: 'animals' },
  { src: '/images/garden/pink-mullein-verbascum-perennial-garden.jpg', alt: 'Pink mullein verbascum flowers blooming in perennial garden bed with fuzzy green foliage', category: 'garden' },
  { src: '/images/garden/pink-speckled-dahlia-closeup-bloom.jpg', alt: 'Vibrant pink speckled dahlia flower in full bloom at Tennessee homestead garden', category: 'garden' },
  { src: '/images/garden/fresh-harvested-sweet-potato-hand.jpg', alt: 'Hand holding freshly harvested sweet potato from straw bale garden at family homestead', category: 'garden' },
  { src: '/images/garden/two-sweet-potatoes-straw-bale-harvest.jpg', alt: 'Two large homegrown sweet potatoes freshly dug from straw bale garden bed', category: 'garden' },
  { src: '/images/garden/sweet-potato-pair-garden-harvest.jpg', alt: 'Pair of fresh sweet potatoes held above straw bale garden showing successful harvest', category: 'garden' },
  { src: '/images/garden/sweet-potatoes-on-straw-bale.jpg', alt: 'Two homegrown sweet potatoes resting on straw bale after fall harvest', category: 'garden' },
  { src: '/images/garden/grape-vines-trellis-geranium-basket.jpg', alt: 'Grape vines growing on wooden trellis with hanging basket of red geraniums in summer garden', category: 'garden' },
  { src: '/images/garden/yellow-red-asiatic-lilies-summer-garden.jpg', alt: 'Yellow and red Asiatic lilies blooming in summer perennial garden with gazing ball ornament', category: 'garden' },
  { src: '/images/garden/pink-verbascum-cottage-garden-sunny.jpg', alt: 'Pink verbascum mullein flowers in sunny cottage garden bed at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/pink-mullein-blooms-garden-path.jpg', alt: 'Delicate pink mullein blooms in perennial flower bed with gravel path background', category: 'garden' },
  { src: '/images/garden/verbascum-flowering-mulched-bed.jpg', alt: 'Pink and white verbascum plant flowering in mulched garden bed with ornamental grasses', category: 'garden' },
  { src: '/images/garden/sedum-green-buds-morning-dew.jpg', alt: 'Sedum stonecrop plants with green flower buds covered in morning dew drops', category: 'garden' },
  { src: '/images/garden/red-orange-yellow-lilies-cottage-garden.jpg', alt: 'Vibrant red orange and yellow Asiatic lilies in cottage garden with gazing ball', category: 'garden' },
  { src: '/images/garden/daisies-lilies-mixed-perennial-garden.jpg', alt: 'Mixed perennial garden with white shasta daisies and colorful Asiatic lilies under summer sky', category: 'garden' },
  { src: '/images/garden/summer-lily-garden-colorful-asiatic-lilies-daisies.jpg', alt: 'Colorful summer flower garden with red orange and yellow Asiatic lilies white Shasta daisies and liatris', category: 'garden' },
  { src: '/images/garden/white-oriental-lilies-stage-venue-background.jpg', alt: 'White Oriental lilies blooming in mulched flower bed with The Stage outdoor event tent visible in background', category: 'garden' },
  { src: '/images/garden/white-lilies-farmhouse-porch-landscaping.jpg', alt: 'White lilies and purple liatris blooming alongside farmhouse porch with columns and green shrubs', category: 'garden' },
  { src: '/images/garden/fresh-sweet-potato-harvest-straw-bale-garden.jpg', alt: 'Hand holding large freshly harvested orange sweet potato from straw bale garden bed on Tennessee farm', category: 'garden' },
  { src: '/images/garden/sweet-potato-trio-straw-bale-harvest.jpg', alt: 'Three large orange sweet potatoes freshly dug from straw bale garden resting on decomposed straw mulch', category: 'garden' },
  { src: '/images/garden/sweet-potatoes-with-roots-straw-bale-garden.jpg', alt: 'Two orange sweet potatoes with roots attached freshly harvested from straw bale garden bed in afternoon sunlight', category: 'garden' },
  { src: '/images/garden/sweet-potato-harvest-row-drying-straw-bale.jpg', alt: 'Row of freshly harvested orange sweet potatoes drying on straw bale in sunlight at Tennessee homestead garden', category: 'garden' },
  { src: '/images/garden/fleabane-liatris-wildflower-garden-bed.jpg', alt: 'White fleabane wildflowers with purple liatris blazing star blooming in mulched perennial garden bed', category: 'garden' },
  { src: '/images/garden/vegetable-garden-squash-vines-raised-beds-trellises.jpg', alt: 'Productive vegetable garden with sprawling squash vines metal raised beds tomato cages and wooden trellis arches', category: 'garden' },
  { src: '/images/pasture-land/gladiolus-flowers-stage-event-tent-pasture.jpg', alt: 'Red and pink gladiolus flowers in foreground with white tent at The Stage outdoor event venue on Tennessee farm', category: 'land' },
  { src: '/images/garden/sunflowers-corn-mixed-cover-crop-field.jpg', alt: 'Sunflowers and corn stalks growing together in mixed planting cover crop field under cloudy summer sky', category: 'garden' },
  { src: '/images/people/garden-work-day-selfie-homestead-volunteers.jpg', alt: 'Two smiling women taking selfie during garden work day at Tennessee family homestead', category: 'people' },
  { src: '/images/garden/pink-knockout-roses-garden-border.jpg', alt: 'Vibrant pink knockout roses blooming along garden border with pine trees and pasture in background', category: 'garden' },
  { src: '/images/garden/coral-pink-roses-farmhouse-background.jpg', alt: 'Coral and pink roses in full bloom with farmhouse in background at Lyles Tennessee homestead', category: 'garden' },
  { src: '/images/garden/frost-covered-perennial-foliage.jpg', alt: 'Frost-covered green foliage with morning dew on perennial plants in homestead garden bed', category: 'garden' },
  { src: '/images/garden/blue-speedwell-wildflowers-ground-cover.jpg', alt: 'Hand reaching toward tiny blue speedwell wildflowers growing among green ground cover plants', category: 'garden' },
  { src: '/images/garden/henbit-wildflowers-pink-blooms-spring.jpg', alt: 'Henbit wildflowers with small pink blooms growing among gravel at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/purple-dead-nettle-henbit-spring-wildflowers.jpg', alt: 'Purple dead nettle and henbit wildflowers blooming in early spring ground cover', category: 'garden' },
  { src: '/images/pasture-land/woodland-trail-clearing-early-spring.jpg', alt: 'Two people clearing woodland trails on Tennessee homestead property in early spring', category: 'land' },
  { src: '/images/garden/daffodil-row-farm-driveway-spring.jpg', alt: 'Row of yellow and white daffodils blooming along farm driveway in Lyles Tennessee', category: 'garden' },
  { src: '/images/garden/grass-seedlings-straw-mulch-raised-bed.jpg', alt: 'Green grass seedlings sprouting through straw mulch in metal raised garden bed', category: 'garden' },
  { src: '/images/garden/raised-garden-beds-straw-bale-method.jpg', alt: 'Metal raised garden beds with straw bale growing method and wood chip pathways', category: 'garden' },
  { src: '/images/house-animals/juliana-pig-foraging-garden-wood-chips.jpg', alt: 'Juliana pig foraging in wood chips between raised garden beds on family homestead', category: 'animals' },
  { src: '/images/house-animals/juliana-pig-spotted-garden-pathway.jpg', alt: 'Black and white spotted Juliana pig walking through fenced vegetable garden area', category: 'animals' },
  { src: '/images/garden/daffodil-row-beehives-farmhouse-spring.jpg', alt: 'Yellow and white daffodils in curved row with beehives and farmhouse in background', category: 'garden' },
  { src: '/images/garden/spring-daffodils-farmhouse-beehives-lyles.jpg', alt: 'Spring daffodils blooming in line leading to historic farmhouse with beehives nearby in Lyles TN', category: 'garden' },
  { src: '/images/garden/daffodil-row-tennessee-homestead-farmhouse.jpg', alt: 'Row of blooming daffodils leading toward Tennessee homestead farmhouse in early spring', category: 'garden' },
  { src: '/images/garden/daffodil-closeup-ground-level-blue-sky.jpg', alt: 'Close-up white and yellow daffodil bloom shot from ground level against blue sky', category: 'garden' },
  { src: '/images/garden/orange-yellow-narcissus-daffodils-mulch-bed.jpg', alt: 'Orange and yellow narcissus daffodils blooming in mulched flower bed', category: 'garden' },
  { src: '/images/pasture-land/frosty-morning-sunrise-red-barn-solar-panels.jpg', alt: 'Frosty morning sunrise over Tennessee farm with red barn and solar panels', category: 'land' },
  { src: '/images/garden/fig-cutting-sprouting-leaves-windowsill.jpg', alt: 'Fig tree cutting with new green leaves sprouting in water glass on windowsill', category: 'garden' },
  { src: '/images/garden/spring-tulips-daffodils-redbud-tree.jpg', alt: 'Pink tulips blooming in mulched flower bed with yellow daffodils and redbud tree in spring at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/spring-tulip-garden-pink-yellow.jpg', alt: 'Spring tulip garden with pink and yellow blooms in fresh mulch at Lyles Tennessee farm', category: 'garden' },
  { src: '/images/garden/yellow-pink-tulip-buds-spring.jpg', alt: 'Yellow and pink tulip buds emerging in mulched garden bed with daffodils in background', category: 'garden' },
  { src: '/images/garden/spring-tulips-tennessee-homestead.jpg', alt: 'Colorful spring tulips in yellow and pink blooming in Tennessee homestead flower garden', category: 'garden' },
  { src: '/images/garden/pink-tulips-overhead-view.jpg', alt: 'Three pink tulips in various stages of bloom from above in mulched garden bed', category: 'garden' },
  { src: '/images/garden/pink-tulip-cluster-spring-bloom.jpg', alt: 'Cluster of soft pink tulips blooming in spring garden with green foliage', category: 'garden' },
  { src: '/images/garden/pink-yellow-tulips-overhead-bloom.jpg', alt: 'Overhead view of pink and yellow tulips in full bloom in mulched flower bed', category: 'garden' },
  { src: '/images/garden/tulip-cluster-birds-eye-spring.jpg', alt: 'Birds eye view of pink and yellow tulip cluster blooming in spring garden', category: 'garden' },
  { src: '/images/garden/yellow-tulips-overhead-farm-garden.jpg', alt: 'Bright yellow tulips blooming overhead view in mulched Tennessee farm garden', category: 'garden' },
  { src: '/images/garden/kids-watering-winter-sown-seedlings.jpg', alt: 'Children watering winter sown milk jug seedlings in raised bed garden with straw bales', category: 'garden' },
  { src: '/images/garden/children-watering-milk-jug-greenhouses.jpg', alt: 'Kids learning to water milk jug mini greenhouses in raised bed vegetable garden', category: 'garden' },
  { src: '/images/garden/kids-winter-sowing-raised-beds.jpg', alt: 'Four children watering winter sowing containers in fenced raised bed garden at family homestead', category: 'garden' },
  { src: '/images/garden/children-watching-seedling-watering.jpg', alt: 'Group of children watching seedling watering in milk jug containers at homestead garden', category: 'garden' },
  { src: '/images/garden/kids-taking-turns-watering-seedlings.jpg', alt: 'Kids taking turns watering winter sown seedlings in recycled milk jug planters', category: 'garden' },
  { src: '/images/garden/kids-watering-winter-sowing-milk-jug-seedlings.jpg', alt: 'Children watering winter sown seedlings in milk jug greenhouses at Tennessee family farm straw bale garden', category: 'garden' },
  { src: '/images/garden/children-winter-sowing-milk-jug-greenhouses-raised-beds.jpg', alt: 'Group of children learning winter sowing technique with recycled milk jug mini greenhouses in raised bed garden', category: 'garden' },
  { src: '/images/garden/girls-checking-winter-sown-seedling-sprouts.jpg', alt: 'Two girls examining seedling sprouts in recycled milk jug containers at homestead garden', category: 'garden' },
  { src: '/images/garden/hands-opening-milk-jug-greenhouse-checking-seeds.jpg', alt: 'Child hands opening milk jug greenhouse to check soil and sprouting seeds in winter sowing project', category: 'garden' },
  { src: '/images/garden/boy-showing-sprouted-seedlings-milk-jug.jpg', alt: 'Young boy showing sprouted seedlings in recycled milk jug winter sowing container at farm garden', category: 'garden' },
  { src: '/images/garden/kids-examining-seedling-sprouts-raised-bed.jpg', alt: 'Children gathered around milk jug seedling greenhouses examining new plant sprouts in raised garden bed', category: 'garden' },
  { src: '/images/garden/children-checking-winter-sowing-sprouts.jpg', alt: 'Children checking winter sown seedlings in recycled milk jug mini greenhouses with visible sprouts', category: 'garden' },
  { src: '/images/garden/girl-revealing-healthy-seedling-starts.jpg', alt: 'Girl lifting milk jug lid to reveal healthy seedling starts in straw bale garden winter sowing setup', category: 'garden' },
  { src: '/images/garden/child-discovering-zinnia-seedlings-growing.jpg', alt: 'Child discovering zinnia seedlings growing in recycled milk jug greenhouse at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/boy-examining-tiny-sprouts-emerging.jpg', alt: 'Young boy examining milk jug winter sowing containers with tiny new sprouts emerging from soil', category: 'garden' },
  { src: '/images/garden/girl-checking-strawberry-seedlings-milk-jug.jpg', alt: 'Girl checking strawberry plant seedlings in recycled milk jug greenhouse at family farm garden', category: 'garden' },
  { src: '/images/house-animals/kids-juliana-pig-hazel-garden-seedlings.jpg', alt: 'Children and Juliana pig Hazel exploring winter sowing seedlings in milk jugs at Tennessee homestead garden', category: 'animals' },
  { src: '/images/people/toddler-muddy-hands-teen-helper-farm-garden.jpg', alt: 'Toddler with muddy hands and teen helper in straw bale garden area at family farm', category: 'people' },
  { src: '/images/people/muddy-red-converse-sneaker-farm-life.jpg', alt: 'Muddy red Converse sneaker showing authentic farm life with children playing in Tennessee homestead garden', category: 'people' },
  { src: '/images/garden/girl-watering-winter-sown-seedlings-raised-bed.jpg', alt: 'Girl watering winter sown seedlings in milk jug greenhouses at straw bale raised bed garden', category: 'garden' },
  { src: '/images/garden/kids-reading-seed-packet-straw-bale-garden.jpg', alt: 'Children reading seed packet instructions in straw bale garden with metal raised beds and trellis arch', category: 'garden' },
  { src: '/images/garden/children-exchanging-seed-packets-winter-sowing.jpg', alt: 'Two children exchanging seed packets while learning winter sowing in milk jug greenhouses', category: 'garden' },
  { src: '/images/garden/kids-reading-seed-instructions-raised-bed.jpg', alt: 'Children reading seed planting instructions over raised bed filled with milk jug winter sowing containers', category: 'garden' },
  { src: '/images/garden/boy-planting-seeds-milk-jug-greenhouse.jpg', alt: 'Boy planting seeds in recycled milk jug greenhouse while holding seed packet at homestead garden', category: 'garden' },
  { src: '/images/garden/girl-planting-seeds-winter-sowing-raised-bed.jpg', alt: 'Girl planting seeds in soil-filled milk jug with plant marker in winter sowing raised bed garden', category: 'garden' },
  { src: '/images/garden/children-teamwork-planting-seeds-winter-sowing.jpg', alt: 'Children working together planting seeds in milk jug winter sowing containers at Tennessee family farm', category: 'garden' },
  { src: '/images/garden/spring-pink-yellow-tulips-garden-bed-2.jpg', alt: 'Spring tulips in pink and yellow blooming along farm garden border', category: 'garden' },
  { src: '/images/garden/spring-pink-yellow-tulips-garden-bed.jpg', alt: 'Pink and yellow tulips blooming in spring garden bed with pine trees in background at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/hellebore-foundation-planting-mulched-bed.jpg', alt: 'Hellebore plants with pale green blooms in mulched foundation garden bed along farmhouse', category: 'garden' },
  { src: '/images/garden/spring-perennial-bed-gazebo-foundation.jpg', alt: 'Spring perennial garden bed with emerging daylilies and shrubs around gazebo foundation at family homestead', category: 'garden' },
  { src: '/images/garden/spring-flower-bed-birdbath-daylilies.jpg', alt: 'Early spring flower bed with emerging daylilies tulips and birdbath garden ornament', category: 'garden' },
  { src: '/images/garden/sedum-stonecrop-summer-garden-bed.jpg', alt: 'Sedum stonecrop plants with developing flower buds in sunny farmhouse foundation garden bed', category: 'garden' },
  { src: '/images/garden/blue-statice-perennial-garden-fence.jpg', alt: 'Lavender blue amsonia or statice flowers blooming in perennial garden bed with picket fence', category: 'garden' },
  { src: '/images/pasture-land/wildflower-pasture-poppies-crimson-clover.jpg', alt: 'Colorful wildflower pasture with red and pink poppies crimson clover and mixed wildflowers at Lyles Tennessee farm', category: 'land' },
  { src: '/images/pasture-land/wildflower-meadow-poppies-larkspur-clover.jpg', alt: 'Mixed wildflower meadow with red poppies purple larkspur and crimson clover in Tennessee pasture', category: 'land' },
  { src: '/images/pasture-land/wildflower-field-poppies-mustard-trees.jpg', alt: 'Wildflower field with red pink poppies yellow mustard flowers and crimson clover against tree line', category: 'land' },
  { src: '/images/pasture-land/wildflower-pasture-closeup-poppies-clover.jpg', alt: 'Close up view of wildflower pasture with pink and red poppies crimson clover and native grasses', category: 'land' },
  { src: '/images/pasture-land/wildflower-meadow-ground-view-poppies.jpg', alt: 'Ground level view of wildflower meadow with colorful poppies and crimson clover reaching toward sky', category: 'land' },
  { src: '/images/pasture-land/purple-larkspur-wildflower-pasture.jpg', alt: 'Purple larkspur flower spike blooming in wildflower pasture with poppies and crimson clover', category: 'land' },
  { src: '/images/pasture-land/larkspur-crimson-clover-meadow.jpg', alt: 'Deep purple larkspur flowers with crimson clover in Tennessee wildflower meadow', category: 'land' },
  { src: '/images/pasture-land/crimson-clover-larkspur-poppies-pasture.jpg', alt: 'Crimson clover and wildflowers with purple larkspur and pink poppies in farm pasture', category: 'land' },
  { src: '/images/pasture-land/yellow-wildflowers-mustard-pasture-fence.jpg', alt: 'Yellow wildflowers and mustard blooming in pasture with pink poppies and farm fence line', category: 'land' },
  { src: '/images/garden/fenced-vegetable-garden-hanging-baskets-straw-bales.jpg', alt: 'Fenced vegetable garden with hanging baskets straw bale planters and raised metal beds at homestead', category: 'garden' },
  { src: '/images/garden/grapevine-fence-trellis-vegetable-garden.jpg', alt: 'Grapevine growing on wooden fence trellis with hanging basket and raised bed vegetable garden', category: 'garden' },
  { src: '/images/garden/asiatic-lilies-liatris-summer-flower-bed.jpg', alt: 'Colorful asiatic lilies in red white and yellow with purple liatris blazing star in mulched flower bed', category: 'garden' },
  { src: '/images/garden/purple-liatris-blazing-star-driveway-garden.jpg', alt: 'Purple liatris blazing star flowers in full bloom along driveway garden bed at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/summer-vegetable-garden-squash-vines-raised-beds.jpg', alt: 'Summer vegetable garden with squash vines tomato cages raised beds and fence trellis under dramatic clouds', category: 'garden' },
  { src: '/images/garden/raised-bed-garden-pergola-squash-blooms-cloudy-sky.jpg', alt: 'Raised bed vegetable garden with squash plants and yellow blooms under wooden pergola at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/zucchini-plant-yellow-flowers-metal-raised-bed.jpg', alt: 'Thriving zucchini plant with yellow flowers growing in metal raised bed surrounded by wood chip mulch paths', category: 'garden' },
  { src: '/images/garden/butter-lettuce-raised-bed-tomato-cages.jpg', alt: 'Fresh butter lettuce heads growing in raised bed garden with tomato cages and cattle panel trellises in background', category: 'garden' },
  { src: '/images/garden/sunflower-row-wood-chip-path-farm-road.jpg', alt: 'Row of young sunflower plants growing along wood chip pathway on Tennessee family farm', category: 'garden' },
  { src: '/images/garden/sunflower-plants-landscape-fabric-mulch-path.jpg', alt: 'Lush sunflower plants in landscape fabric with wood chip mulch pathways at rural Tennessee homestead', category: 'garden' },
  { src: '/images/garden/summer-garden-squash-tomatoes-cucumber-trellis-pergola.jpg', alt: 'Summer vegetable garden with squash vines tomato plants and cucumber trellis under wooden pergola with hanging nasturtium basket', category: 'garden' },
  { src: '/images/garden/raised-bed-garden-squash-nasturtium-basket-sunny.jpg', alt: 'Metal raised bed vegetable garden with sprawling squash plants nasturtium hanging basket and cattle panel arches on sunny day', category: 'garden' },
  { src: '/images/garden/fenced-garden-metal-beds-squash-cucumbers.jpg', alt: 'Fenced vegetable garden with corrugated metal raised beds squash vines and climbing cucumbers at Lyles Tennessee homestead', category: 'garden' },
  { src: '/images/garden/morning-dew-garden-grape-vines-squash-nasturtium.jpg', alt: 'Overcast morning in raised bed garden with grape vines squash plants and hanging nasturtium basket covered in dew', category: 'garden' },
  { src: '/images/garden/sweet-potato-straw-bale-garden-raised-beds-2.jpg', alt: 'Sweet potato vines growing in straw bale garden with metal raised beds and wooden pergola trellis in background', category: 'garden' },
  { src: '/images/garden/raised-bed-vegetable-garden-summer-overview.jpg', alt: 'Fenced homestead garden with black corrugated metal raised beds and wood chip pathways surrounded by pine trees', category: 'garden' },
  { src: '/images/garden/butternut-squash-growing-on-vine.jpg', alt: 'Young butternut squash growing on vine in raised bed garden with straw mulch', category: 'garden' },
  { src: '/images/garden/summer-garden-tomatoes-squash-nasturtiums.jpg', alt: 'Lush summer vegetable garden with metal raised beds growing tomatoes squash and cucumbers with nasturtium hanging basket', category: 'garden' },
  { src: '/images/garden/fenced-raised-bed-garden-wood-chip-paths.jpg', alt: 'Fenced homestead garden with black corrugated metal raised beds and wood chip pathways surrounded by pine trees', category: 'garden' },
  { src: '/images/garden/raised-bed-rows-herbs-squash-stage-view.jpg', alt: 'Rows of black metal raised beds with squash herbs and climbing vegetables with The Stage tent visible in background', category: 'garden' },
  { src: '/images/garden/pink-zinnias-blooming-cut-flower-garden.jpg', alt: 'Vibrant pink zinnia flowers blooming in cut flower garden with sunflowers growing in background', category: 'garden' },
  { src: '/images/garden/zinnia-sunflower-rows-flower-field.jpg', alt: 'Colorful zinnia and sunflower rows in Tennessee homestead cut flower garden with pine trees', category: 'garden' },
  { src: '/images/garden/flower-garden-zinnias-sunflowers-blue-sky.jpg', alt: 'Cut flower garden rows with pink zinnias and tall sunflowers under blue sky with white clouds', category: 'garden' },
  { src: '/images/garden/yellow-sunflowers-blooming-flower-field.jpg', alt: 'Yellow and cream sunflowers beginning to bloom in homestead cut flower garden rows', category: 'garden' },
  { src: '/images/garden/orange-sunflower-rows-farm-garden.jpg', alt: 'Dense rows of sunflowers with orange blooms growing in landscape fabric on Tennessee farm', category: 'garden' },
  { src: '/images/garden/orange-sunflowers-straw-bale-garden-rows.jpg', alt: 'Orange sunflowers blooming in raised straw bale garden rows on Tennessee homestead with overcast sky', category: 'garden' },
  { src: '/images/garden/pink-zinnias-sunflowers-cut-flower-garden.jpg', alt: 'Pink zinnias and sunflower plants growing in cut flower garden with pine trees in background at Lyles Tennessee farm', category: 'garden' },
  { src: '/images/garden/sunflower-field-early-bloom-pine-forest.jpg', alt: 'Expansive sunflower field beginning to bloom with yellow flowers surrounded by pine forest in Tennessee', category: 'garden' },
  { src: '/images/garden/sunflower-field-blue-sky-tennessee-farm.jpg', alt: 'Large sunflower field with scattered yellow blooms under blue sky with white clouds on Tennessee homestead', category: 'garden' },
  { src: '/images/garden/yellow-sunflowers-raised-rows-farm-path.jpg', alt: 'Yellow sunflowers with dark centers blooming in raised garden rows with gravel path and event tent visible', category: 'garden' },
  { src: '/images/garden/coral-zinnias-sunflowers-summer-flower-garden.jpg', alt: 'Pink and coral zinnias blooming alongside tall sunflower stalks in summer flower garden with blue sky', category: 'garden' },
  { src: '/images/garden/sunflower-field-full-bloom-tennessee-homestead.jpg', alt: 'Sunflower field in full bloom with hundreds of yellow sunflowers and pine tree backdrop at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/orange-sunflowers-zinnias-cut-flower-rows.jpg', alt: 'Orange sunflowers and colorful zinnias growing together in cut flower garden with event tent in background', category: 'garden' },
  { src: '/images/garden/fenced-vegetable-garden-raised-metal-beds.jpg', alt: 'Fenced vegetable garden with black metal raised beds full of summer vegetables and green garden hose on wood chip paths', category: 'garden' },
  { src: '/images/garden/cherry-tomatoes-ripening-raised-bed.jpg', alt: 'Cherry tomato plants loaded with ripening white red and orange tomatoes cascading from raised garden bed', category: 'garden' },
  { src: '/images/garden/squash-vine-arch-trellis-hanging-gourds.jpg', alt: 'Garden arch trellis covered with squash vines and long gourds hanging overhead in vegetable garden', category: 'garden' },
  { src: '/images/garden/zucchini-blossom-raised-bed-tomatoes.jpg', alt: 'Zucchini plant with yellow blossom growing in raised bed next to tomato plants with hanging flower basket', category: 'garden' },
  { src: '/images/garden/sunflowers-outside-fenced-vegetable-garden.jpg', alt: 'Yellow sunflowers blooming outside fenced vegetable garden with raised beds and event tent visible through fence', category: 'garden' },
  { src: '/images/garden/raised-bed-vegetable-garden-overview-summer.jpg', alt: 'Wide overview of vegetable garden with multiple black raised metal beds growing summer vegetables on wood chip mulch paths', category: 'garden' },
  { src: '/images/garden/thriving-raised-bed-garden-pine-trees.jpg', alt: 'Thriving vegetable garden with black metal raised beds full of leafy greens and vegetables surrounded by pine trees', category: 'garden' },
  { src: '/images/garden/pink-zinnias-sunflowers-event-tent-farm.jpg', alt: 'Hot pink zinnias and orange sunflowers in cut flower garden rows with white event tent and blue sky at farm venue', category: 'garden' },
  { src: '/images/garden/colorful-cherry-tomatoes-ripening-raised-bed.jpg', alt: 'Colorful cherry tomatoes ripening from green to red and orange in raised metal garden bed with squash leaves', category: 'garden' },
  { src: '/images/garden/cherry-tomato-harvest-raised-beds-sunset.jpg', alt: 'Abundant cherry tomato plants loaded with red and orange fruit growing in raised beds at sunset in vegetable garden', category: 'garden' },
  { src: '/images/garden/sunflower-seed-saving-paper-bags-garden.jpg', alt: 'Paper bags covering sunflower heads to collect seeds for saving in homestead flower garden', category: 'garden' },
  { src: '/images/property/victorian-farmhouse-porch-spring-flower-bed.jpg', alt: 'Victorian farmhouse front porch with hanging ferns and newly planted flower bed with seedlings in mulch', category: 'land' },
  { src: '/images/people/woman-holding-zinnia-bouquet-farm-garden.jpg', alt: 'Woman holding colorful zinnia bouquet in pink dress at Tennessee homestead garden', category: 'people' },
  { src: '/images/garden/squash-vines-arch-trellis-raised-bed.jpg', alt: 'Squash vines growing on metal arch trellis in raised bed vegetable garden', category: 'garden' },
  { src: '/images/garden/red-amaranth-flower-spike-garden.jpg', alt: 'Deep red amaranth flower spike growing in farm vegetable garden', category: 'garden' },
  { src: '/images/garden/raised-bed-garden-overview-summer-2.jpg', alt: 'Raised bed vegetable garden with metal beds and vine trellises surrounded by pine trees', category: 'garden' },
  { src: '/images/garden/hanging-strawberry-baskets-garden-fence.jpg', alt: 'Hanging strawberry baskets on garden fence with grapevines and raised beds', category: 'garden' },
  { src: '/images/garden/squash-vine-archway-tunnel-blooming.jpg', alt: 'Lush squash vine archway tunnel with yellow blooms in raised bed garden', category: 'garden' },
  { src: '/images/garden/pole-beans-climbing-trellis-raised-bed.jpg', alt: 'Pole beans climbing tall trellis in black metal raised bed garden', category: 'garden' },
  { src: '/images/garden/zucchini-squash-plants-raised-bed-edge.jpg', alt: 'Zucchini and squash plants growing along metal raised bed edges with wood chip mulch', category: 'garden' },
  { src: '/images/garden/squash-tunnel-archway-yellow-flowers.jpg', alt: 'Squash vine tunnel archway with yellow flowers connecting raised garden beds', category: 'garden' },
  { src: '/images/garden/white-yellow-daffodil-spring-pasture.jpg', alt: 'White and yellow daffodil blooming in spring pasture at Tennessee farm', category: 'garden' },
  { src: '/images/garden/daffodil-yellow-center-early-spring.jpg', alt: 'Single daffodil flower with yellow center blooming in early spring field', category: 'garden' },
  { src: '/images/garden/pink-tulip-buds-emerging-spring.jpg', alt: 'Pink tulip buds emerging in spring garden row at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/pink-tulips-blooming-flower-rows.jpg', alt: 'Pink tulips beginning to bloom in farm flower bed rows', category: 'garden' },
  { src: '/images/garden/pink-tulips-row-gravel-driveway.jpg', alt: 'Row of pink tulips blooming along gravel driveway at family farm', category: 'garden' },
  { src: '/images/garden/pink-tulip-row-pine-tree-line.jpg', alt: 'Long row of pink tulips stretching toward pine tree line at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/pink-tulips-perspective-pine-forest.jpg', alt: 'Pink tulips in perspective row with Tennessee pine trees in background', category: 'garden' },
  { src: '/images/garden/pink-tulips-closeup-spring-row.jpg', alt: 'Close up of pink tulips blooming in spring flower row on farm', category: 'garden' },
  { src: '/images/garden/pink-tulips-full-bloom-pine-background.jpg', alt: 'Pink tulips in full bloom with Tennessee pine trees in background', category: 'garden' },
  { src: '/images/garden/daffodil-row-spring-driveway-redbud.jpg', alt: 'Curved row of yellow daffodils blooming along gravel driveway with pink redbud tree in spring', category: 'garden' },
  { src: '/images/garden/tulips-daffodils-spring-flower-bed.jpg', alt: 'Emerging tulip shoots and blooming yellow daffodils in mulched flower bed with spring pasture view', category: 'garden' },
  { src: '/images/garden/spring-bulbs-emerging-mulch-bed.jpg', alt: 'Spring bulbs emerging in mulched garden bed alongside blooming yellow daffodils', category: 'garden' },
  { src: '/images/garden/pink-tulip-row-farm-driveway.jpg', alt: 'Row of pink tulips blooming along gravel farm driveway in early spring with pine forest backdrop', category: 'garden' },
  { src: '/images/garden/variegated-pink-tulips-driveway-row.jpg', alt: 'Pink and white variegated tulips with raindrops blooming in row along Tennessee farm driveway', category: 'garden' },
  { src: '/images/garden/spring-tulips-raindrop-closeup.jpg', alt: 'Pink and white variegated tulips with raindrops blooming in spring flower row', category: 'garden' },
  { src: '/images/garden/pink-tulips-raindrops-pasture-view.jpg', alt: 'Mixed pink tulips with water droplets blooming in farm flower row with green pasture background', category: 'garden' },
  { src: '/images/garden/dewy-pink-tulips-farm-row.jpg', alt: 'Dewy pink tulips blooming in farm flower row in morning light', category: 'garden' },
  { src: '/images/garden/pink-tulip-buds-morning-dew.jpg', alt: 'Pink tulip buds with morning dew standing tall in spring flower row at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/spring-tulips-closeup-pine-backdrop.jpg', alt: 'Spring tulips closeup with pine backdrop at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/yellow-daffodils-mulch-bed-tractor.jpg', alt: 'Bright yellow and orange daffodils blooming in bark mulch bed with farm tractor visible in background', category: 'garden' },
  { src: '/images/garden/daffodil-closeup-spring-garden.jpg', alt: 'Bright yellow and orange daffodils blooming in bark mulch bed in spring garden', category: 'garden' },
  { src: '/images/garden/pink-ranunculus-herb-garden-bed.jpg', alt: 'Pink ranunculus bud opening among parsley herbs and garlic in cottage garden bed with lattice backdrop', category: 'garden' },
  { src: '/images/garden/orange-ranunculus-blooms-garden-bed.jpg', alt: 'Bright orange ranunculus flowers blooming among green foliage in a Tennessee homestead garden bed', category: 'garden' },
  { src: '/images/garden/orange-ranunculus-flowers-mulched-bed.jpg', alt: 'Vibrant orange ranunculus flowers with red buds growing in mulched flower garden at Lyles Tennessee farm', category: 'garden' },
  { src: '/images/garden/pink-anemone-flowers-cottage-garden.jpg', alt: 'Deep pink anemone flowers in full bloom with ruffled petals growing in cottage garden flower bed', category: 'garden' },
  { src: '/images/garden/spring-flower-bed-farmhouse-fence.jpg', alt: 'Spring flower garden bed with ranunculus and perennials growing along cedar picket fence beside farmhouse porch in Tennessee', category: 'garden' },
  { src: '/images/garden/daffodil-row-spring-farmhouse-view.jpg', alt: 'Row of yellow and white daffodils blooming in spring with Tennessee farmhouse homestead in background', category: 'garden' },
  { src: '/images/garden/yellow-white-daffodils-homestead-backdrop.jpg', alt: 'Mixed yellow and white daffodils in bloom along farm driveway with family homestead house in Lyles Tennessee', category: 'garden' },
  { src: '/images/garden/white-yellow-daffodils-naturalized-row.jpg', alt: 'White daffodils with yellow centers blooming in a naturalized row along grassy Tennessee farm pathway', category: 'garden' },
  { src: '/images/garden/spring-daffodil-border-farm-edge.jpg', alt: 'Yellow and white spring daffodils planted in curved row along Tennessee farm property edge', category: 'garden' },
  { src: '/images/garden/yellow-daffodil-cluster-mulched-bed.jpg', alt: 'Cluster of bright yellow daffodils blooming in wood chip mulch bed with farm tractor visible in background', category: 'garden' },
  { src: '/images/garden/red-tulip-bud-emerging-spring.jpg', alt: 'Red tulip bud emerging from green leaves in wood chip mulched spring garden bed at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/daffodil-clusters-gravel-driveway.jpg', alt: 'Spring bulb garden with daffodil clusters blooming along gravel driveway at Tennessee family farm', category: 'garden' },
  { src: '/images/garden/mixed-daffodils-spring-hillside.jpg', alt: 'Yellow and orange daffodils with white varieties blooming together in spring along farm hillside in Tennessee', category: 'garden' },
  { src: '/images/garden/colorful-tulip-row-farm-driveway-2.jpg', alt: 'Colorful tulip row in pink red and yellow blooming along farm driveway with pine trees and blue sky in Lyles Tennessee', category: 'garden' },
  { src: '/images/garden/tulip-row-curved-driveway-pines.jpg', alt: 'Long row of spring tulips in pastel colors curving along gravel drive with pine forest backdrop at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/tulips-low-angle-blue-sky.jpg', alt: 'Low angle view of pink burgundy and cream tulips blooming against blue sky with fluffy clouds at family farm', category: 'garden' },
  { src: '/images/garden/mixed-tulips-spring-farm-driveway.jpg', alt: 'Mixed spring tulips in shades of pink purple and white growing along Tennessee farm driveway with pine trees', category: 'garden' },
  { src: '/images/garden/spring-daffodils-mulched-garden-bed.jpg', alt: 'Yellow daffodils blooming in wood chip mulch bed with white daffodils and farm tractor in background at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/spring-daffodils-mulched-garden-bed-2.jpg', alt: 'Spring daffodils blooming in mulched garden bed at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/spring-daffodils-mulched-garden-bed-3.jpg', alt: 'Spring daffodils blooming in mulched garden bed at Forevermore Farm', category: 'garden' },
  { src: '/images/garden/spring-daffodils-mulched-garden-bed-4.jpg', alt: 'Spring daffodils in full bloom in mulched garden bed at Tennessee homestead', category: 'garden' },
  { src: '/images/garden/spring-daffodils-mulched-garden-bed-5.jpg', alt: 'Yellow daffodils blooming in spring mulched garden bed at Forevermore Farm in Lyles TN', category: 'garden' },
  { src: '/images/garden/spring-daffodils-mulched-garden-bed-6.jpg', alt: 'Bright spring daffodils blooming in mulched garden bed at Tennessee family farm', category: 'garden' },

  // === Garden Build (new) ===
  { src: '/images/garden-build/building-raised-bed-frame-power-drill.jpg', alt: 'Farmer using power drill to construct wooden raised garden bed frame on Tennessee homestead', category: 'garden-build' },
  { src: '/images/garden-build/planting-template-landscape-fabric-holes.jpg', alt: 'Using bulb planting template on landscape fabric to create evenly spaced planting holes for flower garden', category: 'garden-build' },
  { src: '/images/garden-build/landscape-fabric-marked-planting-spots.jpg', alt: 'Landscape fabric with spray painted planting hole markers for flower bed preparation on farm', category: 'garden-build' },
  { src: '/images/garden-build/flower-farm-rows-landscape-fabric-preparation.jpg', alt: 'Long rows of landscape fabric with cut planting holes prepared for flower farm installation in Tennessee', category: 'garden-build' },
  { src: '/images/garden-build/galvanized-metal-raised-bed-new.jpg', alt: 'New gray galvanized metal raised garden bed installed on cleared ground at farm', category: 'garden-build' },
  { src: '/images/garden-build/metal-raised-bed-interior-bracing.jpg', alt: 'Interior view of large metal raised bed showing cross bracing supports before filling with soil', category: 'garden-build' },
  { src: '/images/garden-build/vevor-metal-raised-bed-installed.jpg', alt: 'Vevor brand corrugated metal raised garden bed with gray finish ready for planting', category: 'garden-build' },
  { src: '/images/garden-build/straw-bale-garden-sweet-potato-vines.jpg', alt: 'Straw bale garden bed with dried sweet potato vines ready for harvest in fall', category: 'garden-build' },
  { src: '/images/garden-build/straw-bale-bed-end-of-season.jpg', alt: 'Decomposing straw bale garden bed with dried vines at end of growing season', category: 'garden-build' },
  { src: '/images/garden-build/volunteers-preparing-straw-bale-garden-beds.jpg', alt: 'Volunteers working with pitchforks to prepare straw bale garden beds inside fenced vegetable garden area at Tennessee farm', category: 'garden-build' },
  { src: '/images/garden-build/straw-bale-garden-build-juliana-pig-helper.jpg', alt: 'Team building straw bale garden with Juliana pig helping in fenced garden area at Lyles Tennessee homestead', category: 'garden-build' },
  { src: '/images/garden-build/farmer-volunteer-straw-bale-garden-preparation.jpg', alt: 'Bearded farmer and volunteer working on straw bale garden bed preparation in early spring at Tennessee homestead', category: 'garden-build' },
  { src: '/images/garden-build/volunteers-moving-straw-bales-garden-build.jpg', alt: 'Two volunteers moving decomposed straw bales in fenced garden area during spring garden build day', category: 'garden-build' },
  { src: '/images/garden-build/juliana-pig-straw-bale-garden-rows.jpg', alt: 'Spotted Juliana pig exploring straw bale garden rows being prepared for planting in fenced vegetable garden', category: 'garden-build' },
  { src: '/images/garden-build/metal-raised-beds-installation-garden-build.jpg', alt: 'New black corrugated metal raised garden beds installed on landscape fabric next to straw bales in fenced garden', category: 'garden-build' },
  { src: '/images/garden-build/raised-beds-straw-bale-fill-hugelkultur-method.jpg', alt: 'Row of black metal raised beds filled with fresh straw bales for hugelkultur style planting at Tennessee homestead garden', category: 'garden-build' },
  { src: '/images/garden-build/raised-beds-composting-straw-layers-preparation.jpg', alt: 'Metal raised garden beds with decomposing straw and compost layers being prepared for spring vegetable planting', category: 'garden-build' },
  { src: '/images/garden-build/filling-raised-beds-with-straw-compost.jpg', alt: 'Two men filling metal raised garden beds with straw and compost material inside fenced garden area at Tennessee homestead', category: 'garden-build' },
  { src: '/images/garden-build/workers-adding-straw-metal-raised-beds.jpg', alt: 'Farm workers adding decomposed straw to corrugated metal raised beds in fenced vegetable garden', category: 'garden-build' },
  { src: '/images/garden-build/installing-weed-barrier-fabric-garden.jpg', alt: 'Man holding landscape staples standing on black weed barrier fabric near corrugated metal raised garden beds', category: 'garden-build' },
  { src: '/images/garden-build/weed-barrier-between-raised-beds.jpg', alt: 'Black weed barrier landscape fabric laid between gray metal raised beds in fenced homestead garden', category: 'garden-build' },
  { src: '/images/garden-build/raised-beds-filled-decomposed-straw.jpg', alt: 'Multiple corrugated metal raised beds filled with decomposed straw bale material in fenced garden area', category: 'garden-build' },
  { src: '/images/garden-build/row-metal-raised-beds-straw-filled.jpg', alt: 'Row of gray corrugated metal raised garden beds filled with straw bale compost on black landscape fabric', category: 'garden-build' },
  { src: '/images/garden-build/close-up-straw-compost-raised-bed.jpg', alt: 'Close-up of decomposed straw and compost filling corrugated metal raised bed in homestead garden', category: 'garden-build' },
  { src: '/images/garden-build/completed-raised-bed-garden-setup.jpg', alt: 'Completed raised bed garden setup with multiple metal beds on weed barrier fabric inside deer fencing', category: 'garden-build' },
  { src: '/images/garden-build/trailer-straw-bales-pickup.jpg', alt: 'Farm trailer loaded with straw bales for straw bale gardening being unloaded at feed store', category: 'garden-build' },
  { src: '/images/garden-build/straw-bales-trailer-ready-transport.jpg', alt: 'Full trailer of straw bales secured with cattle panels ready for transport to homestead garden', category: 'garden-build' },
  { src: '/images/garden-build/garden-beds-fresh-straw-bales.jpg', alt: 'Fenced garden area with corrugated metal raised beds and fresh straw bales ready for conditioning', category: 'garden-build' },
  { src: '/images/garden-build/straw-bales-inside-raised-bed.jpg', alt: 'Straw bales placed inside corrugated metal raised bed for straw bale gardening method', category: 'garden-build' },
  { src: '/images/garden-build/fertilizer-pellets-conditioning-straw-bales.jpg', alt: 'Fertilizer pellets conditioning straw bales in raised garden bed for decomposition', category: 'garden-build' },
  { src: '/images/garden-build/straw-bale-conditioning-raised-beds.jpg', alt: 'Metal raised beds with straw bales being conditioned with nitrogen fertilizer for planting preparation', category: 'garden-build' },
  { src: '/images/garden-build/fertilizer-application-straw-bale-garden.jpg', alt: 'Straw bales with fertilizer application in corrugated steel raised bed garden system', category: 'garden-build' },
  { src: '/images/garden-build/overview-straw-bale-raised-bed-garden.jpg', alt: 'Overview of multiple corrugated metal raised beds with conditioned straw in fenced Tennessee homestead garden', category: 'garden-build' },
  { src: '/images/garden-build/worm-bin-drainage-holes-diy-setup.jpg', alt: 'White plastic bin with drainage holes drilled for DIY worm composting bin', category: 'garden-build' },
  { src: '/images/garden-build/worm-bin-cardboard-bedding-layer.jpg', alt: 'Shredded corrugated cardboard bedding layer in worm composting bin setup', category: 'garden-build' },
  { src: '/images/garden-build/worm-bin-kraft-paper-bedding.jpg', alt: 'Brown kraft paper layer added to DIY worm composting bin for bedding', category: 'garden-build' },
  { src: '/images/garden-build/worm-bin-torn-paper-carbon-bedding.jpg', alt: 'Torn brown paper pieces as carbon bedding material in worm composting bin', category: 'garden-build' },
  { src: '/images/garden-build/worm-bin-coconut-coir-substrate-layer.jpg', alt: 'Moist coconut coir substrate layer in worm bin for vermicomposting setup', category: 'garden-build' },
  { src: '/images/garden-build/coco-coir-potting-mix-seed-starting.jpg', alt: 'Rich brown coco coir potting mix in paper liner inside white container for seed starting preparation', category: 'garden-build' },
  { src: '/images/garden-build/shredded-paper-worm-bin-bedding.jpg', alt: 'Hand holding shredded brown paper bedding material over worm composting bin setup', category: 'garden-build' },
  { src: '/images/garden-build/mixing-worm-bin-bedding-materials.jpg', alt: 'Hand mixing coco coir and shredded paper bedding in white worm composting bin', category: 'garden-build' },
  { src: '/images/garden-build/uncle-jims-worm-farm-bag.jpg', alt: 'Uncle Jim\'s Worm Farm branded bag for red wiggler composting worms', category: 'garden-build' },
  { src: '/images/garden-build/red-wiggler-worms-vermicompost-bin.jpg', alt: 'Red wiggler composting worms in coco coir and shredded paper bedding for vermicomposting', category: 'garden-build' },
  { src: '/images/garden-build/red-wiggler-worms-closeup-bedding.jpg', alt: 'Close up of red wiggler composting worms thriving in moist bedding material', category: 'garden-build' },
  { src: '/images/garden-build/laying-landscape-fabric-garden-rows.jpg', alt: 'Family members laying black landscape fabric over garden rows at Tennessee homestead with tractor in background', category: 'garden-build' },
  { src: '/images/garden-build/rolling-weed-barrier-garden-beds.jpg', alt: 'Rolling out weed barrier fabric on prepared garden beds with wooden animal enclosure visible in background', category: 'garden-build' },
  { src: '/images/garden-build/team-installing-garden-fabric.jpg', alt: 'Three people working together to unroll and position landscape fabric on farm garden rows', category: 'garden-build' },
  { src: '/images/garden-build/staking-landscape-fabric-edges.jpg', alt: 'Family securing landscape fabric edges with stakes on garden beds at Lyles Tennessee farm', category: 'garden-build' },
  { src: '/images/garden-build/hazel-pig-dorothy-jean-garden-helpers.jpg', alt: 'Juliana pig Hazel and dog Dorothy Jean supervising garden bed preparation with landscape fabric rows', category: 'garden-build' },
  { src: '/images/garden-build/juliana-pig-foraging-garden-rows.jpg', alt: 'Spotted Juliana pig foraging between freshly installed landscape fabric garden rows with dog resting nearby', category: 'garden-build' },
  { src: '/images/garden-build/completed-fabric-rows-farm-animals.jpg', alt: 'Wide view of completed landscape fabric rows with Juliana pig Dorothy Jean the dog and family working in background', category: 'garden-build' },
  { src: '/images/garden-build/straw-bale-garden-construction-compost.jpg', alt: 'Straw bale garden beds under construction with compost and t-posts for support', category: 'garden-build' },
  { src: '/images/garden-build/kubota-tractor-hauling-compost-garden.jpg', alt: 'Kubota tractor hauling compost for straw bale garden preparation on farm', category: 'garden-build' },


  // === Animal gallery additions (April 2026) ===
  { src: '/images/goats/newborn-goat-kids-hay-1.jpg', alt: 'Newborn goat kids resting on hay', category: 'goats' },
  { src: '/images/goats/tan-goat-kid-clover-1.jpg', alt: 'A tan goat kid standing in clover', category: 'goats' },
  { src: '/images/goats/gray-goat-kid-tall-grass-1.jpg', alt: 'A gray goat kid in tall grass', category: 'goats' },
  { src: '/images/goats/nigerian-dwarf-goat-kids-pasture-1.jpg', alt: 'Nigerian Dwarf goat kids out in the pasture', category: 'goats' },
  { src: '/images/goats/tan-goat-kids-standing-together-1.jpg', alt: 'Two tan goat kids standing shoulder to shoulder', category: 'goats' },
  { src: '/images/goats/tan-goat-kid-closeup-grass-1.jpg', alt: 'A tan goat kid standing in the grass', category: 'goats' },
  { src: '/images/goats/boy-holding-goat-kid-by-pen-1.jpg', alt: 'A boy holding a goat kid beside the pen', category: 'goats' },
  { src: '/images/goats/smiling-boy-holding-goat-kid-1.jpg', alt: 'A smiling boy holding a goat kid', category: 'goats' },
  { src: '/images/goats/goat-kid-eating-bucket-feeder-1.jpg', alt: 'A goat kid eating from a bucket feeder', category: 'goats' },
  { src: '/images/goats/goat-kid-standing-in-stall-1.jpg', alt: 'A goat kid standing quietly in the stall', category: 'goats' },
  { src: '/images/goats/tan-goat-closeup-barn-1.jpg', alt: 'A tan goat close up inside the barn', category: 'goats' },
  { src: '/images/goats/kids-feeding-goat-kids-pen-1.jpg', alt: 'Kids feeding goat kids in the pen', category: 'goats' },
  { src: '/images/goats/children-petting-goat-kid-stall-1.jpg', alt: 'Children petting a goat kid in the stall', category: 'goats' },

  { src: '/images/rabbits/black-standard-rex-rabbit-wire-cage-1.jpg', alt: 'A black Standard Rex rabbit standing in a wire cage', category: 'rabbits' },
  { src: '/images/rabbits/black-white-standard-rex-rabbit-cage-1.jpg', alt: 'A black and white Standard Rex rabbit in its pen', category: 'rabbits' },
  { src: '/images/rabbits/brown-standard-rex-rabbit-cage-1.jpg', alt: 'A brown Standard Rex rabbit resting in its cage', category: 'rabbits' },
  { src: '/images/rabbits/kids-holding-rabbit-barn-wall-1.jpg', alt: 'Kids holding a rabbit by the barn wall', category: 'rabbits' },
  { src: '/images/rabbits/family-sitting-with-rabbit-outside-barn-1.jpg', alt: 'Family sitting outside the barn with a rabbit in their laps', category: 'rabbits' },
  { src: '/images/rabbits/children-holding-black-rabbit-1.jpg', alt: 'Children holding a black rabbit', category: 'rabbits' },
  { src: '/images/rabbits/black-standard-rex-rabbit-cage-2.jpg', alt: 'A black Standard Rex rabbit with alert ears in its cage', category: 'rabbits' },
  { src: '/images/rabbits/brown-standard-rex-rabbit-cage-2.jpg', alt: 'A brown Standard Rex rabbit sitting quietly in its pen', category: 'rabbits' },
  { src: '/images/rabbits/brown-standard-rex-rabbit-wire-cage-3.jpg', alt: 'A brown Standard Rex rabbit in a wire cage', category: 'rabbits' },
  { src: '/images/rabbits/brown-standard-rex-rabbit-closeup-1.jpg', alt: 'Close view of a brown Standard Rex rabbit', category: 'rabbits' },
  { src: '/images/rabbits/brown-standard-rex-rabbit-resting-cage-1.jpg', alt: 'A brown Standard Rex rabbit resting in its cage', category: 'rabbits' },
  { src: '/images/rabbits/gray-standard-rex-rabbit-on-lap-1.jpg', alt: "A gray Standard Rex rabbit sitting on someone's lap", category: 'rabbits' },
  { src: '/images/rabbits/brown-standard-rex-rabbit-portrait-1.jpg', alt: 'A brown Standard Rex rabbit in a close portrait', category: 'rabbits' },

  { src: '/images/pigs/pigs-walking-wooded-pen-1.jpg', alt: 'Pigs walking through the wooded pen at Forevermore Farm', category: 'hogs' },
  { src: '/images/pigs/piglet-closeup-straw-bedding-1.jpg', alt: 'A piglet curled up close in the straw bedding', category: 'hogs' },
  { src: '/images/pigs/spotted-pig-resting-grass-1.jpg', alt: 'A spotted pig resting in the grass', category: 'hogs' },
  { src: '/images/pigs/pig-snout-closeup-grass-1.jpg', alt: 'Close view of a pig snout in the grass', category: 'hogs' },
  { src: '/images/pigs/pig-nose-under-branches-1.jpg', alt: 'A pig nosing around beneath low branches', category: 'hogs' },
  { src: '/images/pigs/newborn-piglets-sleeping-straw-1.jpg', alt: 'Newborn piglets sleeping together in the straw', category: 'hogs' },
  { src: '/images/pigs/pigs-resting-straw-paddock-1.jpg', alt: 'Pigs resting in a straw paddock', category: 'hogs' },
  { src: '/images/pigs/pigs-foraging-wooded-enclosure-1.jpg', alt: 'Pigs foraging through their wooded enclosure', category: 'hogs' },
  { src: '/images/pigs/sow-nursing-piglets-hay-1.jpg', alt: 'A sow nursing her piglets on fresh hay', category: 'hogs' },
  { src: '/images/pigs/pig-snout-through-fence-1.jpg', alt: 'A pig snout pressed through the fence', category: 'hogs' },
  { src: '/images/pigs/woman-cuddling-pig-1.jpg', alt: 'A woman cuddling one of the pigs', category: 'hogs' },
  { src: '/images/pigs/piglets-resting-indoor-pen-1.jpg', alt: 'Piglets resting together in the indoor pen', category: 'hogs' },
  { src: '/images/pigs/smiling-pig-portrait-1.jpg', alt: 'A content pig grinning straight at the camera', category: 'hogs' },
  { src: '/images/pigs/muddy-pig-snout-1.jpg', alt: 'A muddy pig snout up close', category: 'hogs' },
  { src: '/images/pigs/pigs-gathered-shaded-woods-1.jpg', alt: 'A group of pigs gathered in the shade of the woods', category: 'hogs' },
  { src: '/images/pigs/large-pigs-standing-shade-1.jpg', alt: 'Large pigs standing together in the shade', category: 'hogs' },
  { src: '/images/pigs/pigs-gathered-wooded-pen-2.jpg', alt: 'Pigs moving through the wooded pen together', category: 'hogs' },
  { src: '/images/pigs/piglets-piled-hay-bedding-1.jpg', alt: 'Piglets piled up on the hay bedding', category: 'hogs' },
  { src: '/images/pigs/sleeping-piglets-closeup-1.jpg', alt: 'Sleeping piglets tucked close together', category: 'hogs' },
  { src: '/images/pigs/spotted-pig-portrait-1.jpg', alt: 'A spotted pig in a close portrait', category: 'hogs' },
  { src: '/images/pigs/piglet-standing-straw-1.jpg', alt: 'A piglet standing on the straw and looking up', category: 'hogs' },
  { src: '/images/pigs/piglets-at-feed-trough-1.jpg', alt: 'Piglets gathered around the feed trough', category: 'hogs' },
  { src: '/images/pigs/piglet-walking-toward-camera-1.jpg', alt: 'A piglet walking toward the camera through the straw', category: 'hogs' },
  { src: '/images/pigs/piglet-nibbling-straw-1.jpg', alt: 'A piglet nibbling on straw', category: 'hogs' },

  { src: '/images/sheep/children-meeting-katahdin-sheep-pasture-1.jpg', alt: 'Children meeting Katahdin sheep in a grassy pasture', category: 'sheep' },

  { src: '/images/chickens/mixed-chickens-inside-coop-1.jpg', alt: 'A mixed flock of chickens tucked inside the coop at Forevermore Farm', category: 'chickens' },
  { src: '/images/chickens/hen-with-black-chicks-grass-1.jpg', alt: 'A brown hen keeping close watch over her black chicks in the grass', category: 'chickens' },
  { src: '/images/chickens/hen-with-chicks-dirt-1.jpg', alt: 'A hen and her chicks picking through the dirt together', category: 'chickens' },
  { src: '/images/chickens/black-chicken-perched-tree-1.jpg', alt: 'A black chicken perched high in a leafy tree', category: 'chickens' },
  { src: '/images/chickens/barred-hens-inside-coop-1.jpg', alt: 'Barred hens gathered together inside the coop', category: 'chickens' },
  { src: '/images/chickens/fluffy-chicks-under-brooder-lamp-1.jpg', alt: 'A cluster of fluffy chicks warming up beneath the brooder lamp', category: 'chickens' },
  { src: '/images/chickens/kids-holding-baby-chicks-outdoors-1.jpg', alt: 'Children holding baby chicks outside the barn', category: 'chickens' },
  { src: '/images/chickens/kids-holding-farm-eggs-porch-1.jpg', alt: 'Children proudly holding fresh eggs on the porch', category: 'chickens' },
  { src: '/images/chickens/child-holding-buff-hen-1.jpg', alt: 'A child holding a buff hen close to the fence', category: 'chickens' },
  { src: '/images/chickens/family-sorting-eggs-table-1.jpg', alt: 'Family sorting gathered eggs at the table', category: 'chickens' },
  { src: '/images/chickens/kids-collecting-eggs-tray-1.jpg', alt: 'Kids collecting eggs from a full tray', category: 'chickens' },
  { src: '/images/chickens/kids-checking-egg-incubator-1.jpg', alt: 'Children checking on eggs in the incubator', category: 'chickens' },
  { src: '/images/chickens/kids-holding-chicks-barnyard-1.jpg', alt: 'Children carrying chicks through the barnyard', category: 'chickens' },
  { src: '/images/chickens/laying-flock-sunlit-yard-1.jpg', alt: 'The laying flock spread out in the sunlit yard', category: 'chickens' },
  { src: '/images/chickens/child-holding-white-silkie-1.jpg', alt: 'A child holding a white silkie chicken', category: 'chickens' },
  { src: '/images/chickens/chicks-hatching-incubator-1.jpg', alt: 'Chicks hatching in the incubator', category: 'chickens' },
  { src: '/images/chickens/mixed-color-chicks-white-backdrop-1.jpg', alt: 'A mix of newly hatched chicks against a white backdrop', category: 'chickens' },
  { src: '/images/chickens/eggs-on-wire-conveyor-1.jpg', alt: 'Farm eggs lined up on the wire conveyor', category: 'chickens' },
  { src: '/images/chickens/chick-in-grass-rabbits-behind-1.jpg', alt: 'A chick in the grass with rabbits blurred in the background', category: 'chickens' },
  { src: '/images/chickens/hand-holding-speckled-egg-1.jpg', alt: "A tiny speckled egg resting in someone's hand", category: 'chickens' },
  { src: '/images/chickens/barred-hens-grass-1.png', alt: 'Barred hens roaming through the grass', category: 'chickens' },
  { src: '/images/chickens/barred-hens-by-coop-fence-1.jpg', alt: 'Barred hens gathered along the coop fence', category: 'chickens' },
  { src: '/images/chickens/white-rooster-grassy-yard-1.jpg', alt: 'A white rooster standing tall in the grassy yard', category: 'chickens' },
  { src: '/images/chickens/hens-eating-red-feeder-1.jpg', alt: 'Hens eating together from a red feeder', category: 'chickens' },
  { src: '/images/chickens/buff-rooster-with-barred-hens-1.jpg', alt: 'A buff rooster walking with barred hens nearby', category: 'chickens' },
  { src: '/images/chickens/chickens-resting-grassy-path-1.jpg', alt: 'Chickens resting along the grassy path', category: 'chickens' },
]

const ANIMAL_SUBCATEGORIES: Category[] = ['hogs', 'goats', 'sheep', 'chickens', 'rabbits']

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'garden', label: 'Garden' },
  { id: 'garden-build', label: 'Garden Build' },
  { id: 'animals', label: 'Animals' },
  { id: 'hogs', label: 'Hogs' },
  { id: 'goats', label: 'Goats' },
  { id: 'sheep', label: 'Sheep' },
  { id: 'chickens', label: 'Chickens' },
  { id: 'rabbits', label: 'Rabbits' },
  { id: 'land', label: 'The Land' },
  { id: 'people', label: 'People' },
  { id: 'events', label: 'Events' },
]

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'all'
    ? photos
    : activeCategory === 'animals'
      ? photos.filter((p) => p.category === 'animals' || ANIMAL_SUBCATEGORIES.includes(p.category))
      : photos.filter((p) => p.category === activeCategory)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }, [lightboxIndex, filtered.length])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }, [lightboxIndex, filtered.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <>
      <HeroSection
        title="Life at Forevermore"
        subtitle="A look inside the farm — the gardens, the animals, the land, and the people who make it home."
        bgImage="/images/garden/lilies-daisies-garden-bed.jpg"
        bgPositionMobile="50% 60%"
        bgPositionDesktop="50% 60%"
      />

      <section className="bg-farm-cream py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* Category filter tabs */}
          <div className="relative overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 mb-10">
            <div className="flex gap-2 min-w-max md:flex-wrap md:min-w-0 md:justify-center">
              {CATEGORIES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase rounded-sm font-medium whitespace-nowrap transition-colors border ${
                    activeCategory === id
                      ? 'bg-farm-green text-farm-cream border-farm-green'
                      : 'bg-transparent text-farm-charcoal/70 border-farm-tan hover:text-farm-green hover:border-farm-green'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {filtered.map((photo, index) => (
              <button
                key={photo.src}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-square overflow-hidden rounded-sm focus:outline-none focus:ring-2 focus:ring-farm-green focus:ring-offset-2"
                aria-label={`View larger: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-farm-charcoal/0 group-hover:bg-farm-charcoal/20 transition-colors duration-300" />
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-farm-charcoal/50 py-16">No photos in this category.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-2 md:left-6 text-white/80 hover:text-white z-10 p-3"
              aria-label="Previous photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-auto px-12 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-4 left-0 right-0 text-center px-4">
            <p className="text-white/60 text-sm">{filtered[lightboxIndex].alt}</p>
            <p className="text-white/40 text-xs mt-1">{lightboxIndex + 1} / {filtered.length}</p>
          </div>

          {/* Next button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-2 md:right-6 text-white/80 hover:text-white z-10 p-3"
              aria-label="Next photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
