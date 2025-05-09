import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Divider } from '@/components/divider'
import { Label } from '@/components/fieldset'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function CreateProdFormComp() {
  return (
    <form method="post" className="mx-auto max-w-4xl">
      <Heading>Create Product</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Category</Subheading>
          <Text>This will be displayed on your public profile.</Text>
        </div>
        <div>
          <Input aria-label="Organization Name" name="name" defaultValue="Catalyst" />
        </div>
      </section>

      <Divider className="my-5" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Product Name</Subheading>
          <Text>This will be displayed on your public profile. Maximum 240 characters.</Text>
        </div>
        <div>
            <Input aria-label="Organization Name" name="name" defaultValue="Catalyst" />
        </div>
      </section>

      <Divider className="my-5" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>price</Subheading>
          <Text>This will be displayed on your public profile. Maximum 240 characters.</Text>
        </div>
        <div>
            <Input aria-label="Organization Name" name="name" defaultValue="Catalyst" />
        </div>
      </section>
      <Divider className="my-5" soft />
      
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Discount</Subheading>
          <Text>This will be displayed on your public profile. Maximum 240 characters.</Text>
        </div>
        <div>
            <Input aria-label="Organization Name" name="name" defaultValue="Catalyst" />
        </div>
      </section>

      <Divider className="my-5" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Description</Subheading>
          <Text>This is where your organization is registered.</Text>
        </div>
        <div>
        <Textarea aria-label="Description" name="description" />
        </div>
      </section>

      <Divider className="my-5" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Currency</Subheading>
          <Text>The currency that your organization will be collecting.</Text>
        </div>
        <div>
          <Select aria-label="Currency" name="currency" defaultValue="cad">
            <option value="cad">CAD - Canadian Dollar</option>
            <option value="usd">USD - United States Dollar</option>
          </Select>
        </div>
      </section>

      <Divider className="my-5" soft />

      <div className="flex justify-end gap-4">
        <Button type="reset" plain>
          Reset
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}
