from PIL import Image, ImageDraw

def round_corners(input_image_path, output_image_path, radius):
    # Open the input image
    with Image.open(input_image_path) as img:
        # Ensure image is in RGBA mode to handle transparency
        img = img.convert("RGBA")
        
        # Create a mask image with the same size as the input image
        mask = Image.new("L", img.size, 0)
        draw = ImageDraw.Draw(mask)
        
        # Calculate the corners for the rounded rectangle
        left, top, right, bottom = 0, 0, img.size[0], img.size[1]
        draw.rounded_rectangle((left, top, right, bottom), radius=radius, fill=255)
        
        # Apply the mask to the input image
        rounded_img = Image.new("RGBA", img.size)
        rounded_img.paste(img, mask=mask)
        
        # Save the output image
        rounded_img.save(output_image_path, format='ICO')

# Example usage
input_image = "icon.png"  # Update this to the path of your PNG image
output_image = "output.ico"  # Choose where to save the output image
radius = 10  # Adjust the radius of the rounded corners as needed

round_corners(input_image, output_image, radius)