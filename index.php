<?php
$content = file_get_contents('new-words.txt');
$items = explode("\n", $content);
?>
<!DOCTYPE html>
<html>
<head>
	<title>New Words</title>
	<style>
		div.wrap {
			width: 800px;
			margin: 0 auto;
		}
		table {
			width: 100%;
		}
		td {
			font-size: 1em;
			color: #ccc;
			border: 1px solid #222;
		}
		td.eng, td.bng, td.translate {
			width: 30%;
			padding: 1.5em;
			text-transform: capitalize;
		}
		td.translate, td.search {
			width: 10%;
			text-align: center;
		}
		.show {
			float: right;
			cursor: pointer;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="wrap">
	<table>
		<?php
		$i=1;
		foreach ($items as $key => $value) {
			if (!trim($value)) {
				continue;
			}
			$word = explode("=", $value);
		?>
			<tr>
				<td class="eng">
					<?php echo $word[0] ?>
				</td>

				<td class="translate"><span onclick="document.getElementById('word-<?php echo $i ?>').style.display = 'inline-block';" class="show">Show</span></td>

				<td class="search">
					<a target="_blank" href="https://www.google.com/search?q=<?php echo trim($word[0]).'+meaning' ?>">Google</a>
				</td>

				<td class="bng">
					<span id="word-<?php echo $i ?>" class="word" style="display: none;">
						<?php echo $word[1] ?>
					</span>
				</td>
			</tr>
		<?php
		$i++;
		}
		?>
	</table>
	</div>
</body>
</html>